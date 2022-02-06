import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {
  public upload(file: Express.Multer.File): string | never {
    try {
      const fileName = `${uuidv4()}${file.originalname}`;
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      throw new HttpException(
        'Error during loading file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

// import { Injectable } from '@nestjs/common';
// import * as fs from 'fs';

// @Injectable()
// export class FileService {
//   async uploadFile(file) {
//     const response = {
//       originalname: file.originalname,
//       filename: file.filename,
//     };
//     return response;
//   }

//   //Fastify
//   async getFileFastify(filename: string) {
//     const readStream = fs.createReadStream(`static/${filename}`);
//     try {
//       return readStream;
//     } catch (err) {
//       console.error('Pipeline failed', err);
//     }
//   }
// }
