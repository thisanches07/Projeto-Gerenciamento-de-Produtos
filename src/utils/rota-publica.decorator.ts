import { SetMetadata } from '@nestjs/common';

export const CHAVE_ROTA_PUBLICA = 'isPublic';
export const Public = () => SetMetadata(CHAVE_ROTA_PUBLICA, true);
