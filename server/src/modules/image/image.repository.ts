import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Images } from './entity/image.entity';
import { CloudinaryResponse } from 'src/configs/cloudinary.config';
const streamifier = require('streamifier');

@Injectable()
export class ImageRepository {
  constructor(
    @InjectRepository(Images) private imageRepository: Repository<Images>,
  ) {}

  uploadFiles(
    file: Express.Multer.File[],
    body: { productId: number },
  ): Promise<CloudinaryResponse[]> {
    return new Promise<CloudinaryResponse[]>((resolve, reject) => {
      const uploadPromises: Promise<CloudinaryResponse>[] = [];

      for (let i = 0; i < file.length; i++) {
        const uploadPromise: Promise<CloudinaryResponse> = new Promise(
          (innerResolve, innerReject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              (error, result) => {
                if (error) {
                  innerReject(error);
                } else {
                  this.imageRepository
                    .save({
                      imgSrc: result.secure_url,
                      productId: body.productId,
                    })
                    .then((savedImage) => {
                      innerResolve(result);
                    })
                    .catch((saveError) => {
                      innerReject(saveError);
                    });
                }
              },
            );

            streamifier.createReadStream(file[i].buffer).pipe(uploadStream);
          },
        );
        uploadPromises.push(uploadPromise);
      }

      Promise.all(uploadPromises)
        .then((results: CloudinaryResponse[]) => {
          resolve(results);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async getImage(id) {
    return await this.imageRepository.findOne({ where: { id: id } });
  }

  async uploadFile(
    file: Express.Multer.File,
    idImage,
  ): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);

          this.imageRepository.update(idImage, { imgSrc: result.secure_url });
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async deleteImageProduct(idProduct) {
    return await this.imageRepository.delete({
      productId: idProduct.idProduct,
    });
  }
}
