import { TranslateKey } from '../entities/translate-key.entity';

export interface CreateTranslateKey {
  message: string;
  data: TranslateKey;
}

export interface FindAllTranslateKey {
  success: boolean;
  message: string;
  data: TranslateKey[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface FindOneTranslateKey {
  message: string;
  data: TranslateKey;
}

export interface UpdateTranslateKey {
  message: string;
  data: TranslateKey;
}

export interface DeleteTranslateKey {
  message: string;
}
