import { join } from "path";
import { existsSync, mkdir } from "fs";

export  const files_path = join(__dirname, "..", "upload_files");

/**
 * 上传文件时候校验文件夹
 * @returns { Promise<boolean> }
 */
export const create_upload_file = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const s: Boolean = existsSync(files_path);
        if (s) {
            resolve(true);
        } else {
            mkdir(files_path, (e) => {
                if (!e) {
                    resolve(true);
                } else {
                    reject(e);
                }
            })
        }
    })
}