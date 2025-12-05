/** File upload API client */

import axiosClient from "./axiosClient";

export interface FileInfo {
  file_id: string;
  filename: string;
  file_path: string;
  file_url: string;
  file_size: number;
  content_type: string;
  is_image: boolean;
}

export async function uploadChatAttachment(formData: FormData): Promise<FileInfo> {
  const { data } = await axiosClient.post<FileInfo>(
    "/v1/upload/chat-attachment",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
}

export async function deleteFile(filename: string): Promise<void> {
  await axiosClient.delete(`/v1/upload/files/${filename}`);
}

