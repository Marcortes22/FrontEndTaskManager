export interface BaseResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface IdReponse {
  id: number | string;
}
