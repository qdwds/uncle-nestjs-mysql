/*
 * @Description: 校验文件夹是否存在
 * @Author: 前端伪大叔
 * @Date: 2021-06-02 11:08:18
 * @LastEditTime: 2021-06-03 21:19:51
 * @yuque: http://www.yuque.com/qdwds
 */
import { join } from "path";
import { existsSync, mkdir } from "fs";

//  上传地址的文件夹
export const files_path = join(__dirname, "..", "upload_files");


export const create_upload_file = (path: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const s: Boolean = existsSync(path);
        if (s) {
            resolve(true);
        } else {
            mkdir(path, (e) => {
                if (!e) {
                    resolve(true);
                } else {
                    reject(e);
                }
            })
        }
    })
}