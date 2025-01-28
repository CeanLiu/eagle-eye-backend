import { google } from "googleapis";
import "dotenv/config";
import mime from "mime-types";
import * as fs from "fs/promises";
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

export function getDriveInstance() {
  return google.drive({ version: "v3", auth: oauth2Client });
}

export async function uploadFile(filePath) {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: filePath,
        mimeType: mime.lookup(filePath),
        parents: [process.env.FOLDER_ID],
      },
      media: {
        mimeType: mime.lookup(filePath),
        body: fs.createReadStream(filePath),
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}
