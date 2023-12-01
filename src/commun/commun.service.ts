import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CommunService {
  renameKeys(obj: object, keyObj: object): object {
    if (!keyObj) {
      return obj;
    }

    const keys = Object.keys(obj);
    const filmTranslate = keys.reduce((acc, key) => {
      const newKey = keyObj[key] || key;
      acc[newKey] = obj[key];
      return acc;
    }, {});

    return filmTranslate;
  }

  async fechtApi(path: string): Promise<any> {
    const swapi = await fetch('https://swapi.py4e.com/api/' + path)
      .then((res) => res.json())
      .catch((error) => {
        throw new BadRequestException(
          'Ocurrio un error con el servicio',
          error,
        );
      });

    return swapi;
  }
}
