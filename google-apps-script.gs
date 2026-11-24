/**
 * =====================================================================
 *  Aadimaya Group — Google Sheets Enquiry Receiver
 * =====================================================================
 *
 *  The frontend (src/data/siteData.js -> saveLead) POSTs every enquiry
 *  from the website to this Apps Script web app, which appends one row
 *  to the spreadsheet:
 *
 *    https://docs.google.com/spreadsheets/d/
 *      1AjRo0_Ss0kQtr7-A44ICdgCopJ4CgppqcxxAaIDRNSU/edit?gid=0
 *
 *  SETUP (one time only):
 *    1. Open the spreadsheet above.
 *    2. Extensions -> Apps Script.
 *    3. Delete the default code and paste this whole file. Save.
 *    4. Deploy -> New deployment -> Web app:
 *         - Description:    e.g. "Enquiry receiver"
 *         - Execute as:     Me
 *         - Who has access: Anyone
 *       Click Deploy and approve the requested permission.
 *    5. Copy the /exec URL, which looks like:
 *         https://script.google.com/macros/s/AKfycb..../exec
 *    6. In the frontend repo, create a .env file with:
 *         GOOGLE_SHEET_WEBAPP_URL=https://script.google.com/macros/s/<DEPLOYMENT_ID>/exec
 *    7. Rebuild/restart the frontend. Enquiries now land in the sheet.
 * =====================================================================
 */

// gid=0 is the first tab of this spreadsheet.
const TARGET_GID = 0;

/**
 * Column headers, in the exact order they will appear in the sheet.
 */
const HEADERS = [
  "Timestamp",
  "Name",
  "Phone",
  "Email",
  "Service",
  "Project",
  "Preferred Date",
  "Message",
  "Source",
  "Status",
];

/**
 * Maps each sheet column to the matching field sent by the frontend.
 */
const FIELD_MAP = {
  "Timestamp": "__serverTimestamp",
  "Name": "name",
  "Phone": "phone",
  "Email": "email",
  "Service": "service",
  "Project": "project",
  "Preferred Date": "preferredDate",
  "Message": "message",
  "Source": "source",
  "Status": "status",
};

/**
 * Locate the gid=0 tab and make sure the header row exists.
 */
function getTargetSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheets().find(function (s) {
    return s.getSheetId() === TARGET_GID;
  });
  if (!sheet) sheet = ss.getSheets()[0];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
  return sheet;
}

/**
 * Receives POSTs from the website. The body is a JSON object, e.g.:
 *   { name, phone, email, service, project, preferredDate,
 *     message, source, submittedAt, status }
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  let hasLock = false;

  try {
    // Avoid duplicate/concurrent writes. If the lock cannot be acquired
    // within 10s, tell the client to retry instead of racing the write.
    hasLock = lock.tryLock(10000);
    if (!hasLock) {
      return jsonResponse_({
        success: false,
        error:
          "Busy. This enquiry was saved locally and will reach " +
          "the team shortly; please try again in a moment.",
      });
    }

    let payload = {};
    const raw =
      e && e.postData && e.postData.contents
        ? e.postData.contents
        : "";

    if (raw) {
      try {
        payload = JSON.parse(raw);
      } catch (parseError) {
        // Fallback for form-urlencoded style payloads, e.g.
        // "name=John&phone=123". Only attempt this when the body
        // actually looks URL-encoded, otherwise keep {}.
        if (raw.indexOf("=") !== -1) {
          const params = new URLSearchParams(raw);
          payload = Object.fromEntries(params.entries());
        }
      }
    }

    // Be defensive: an empty body becomes {} rather than null.
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      payload = {};
    }

    const sheet = getTargetSheet_();

    // Always generate the download/enquiry timestamp on the backend.
    // The frontend does not send or display a date field.
    const serverTimestamp = new Date();

    const row = HEADERS.map(function (header) {
      const key = FIELD_MAP[header];
      if (key === "__serverTimestamp") {
        return serverTimestamp.toISOString();
      }
      const value = payload[key];
      return value !== undefined && value !== null
        ? String(value)
        : "";
    });

    sheet.appendRow(row);

    return jsonResponse_({
      success: true,
      row: sheet.getLastRow(),
    });
  } catch (error) {
    return jsonResponse_({
      success: false,
      error: String(error),
    });
  } finally {
    // Only release the lock if it was actually acquired, otherwise
    // releaseLock() throws and masks the real outcome.
    if (hasLock) {
      try {
        lock.releaseLock();
      } catch (releaseError) {
        // Never let cleanup errors surface to the client.
      }
    }
  }
}

/** Lightweight health check you can open in a browser. */
function doGet() {
  return jsonResponse_({
    ok: true,
    note: "Aadimaya enquiry receiver is running.",
    spreadsheet:
      SpreadsheetApp.getActiveSpreadsheet().getName(),
  });
}

function jsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}