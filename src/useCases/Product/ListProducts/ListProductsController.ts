import { InvalidParamError, MissingHeaderError } from "../../Presentation/errors";
import { badRequest, ok } from "../../Presentation/helpers/http/httpHelper";
import { IController, IHttpRequest, IHttpResponse } from "../../Presentation/Protocols";
import { IListProductsUseCase } from "../../Presentation/Protocols/useCases/ProductUseCases";
import { serverError } from "../../Presentation/helpers/http/httpHelper";


export class ListProductsController implements IController {

  constructor(
    private listProductsUseCase: IListProductsUseCase
  ) { }

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const requiredHeaders = ['x-current-page', 'x-items-per-page'];

      for (let header of requiredHeaders) {
        if (!request.headers[header]) {
          return badRequest(new MissingHeaderError(header));
        }
      }

      for (let header of requiredHeaders) {
        if (typeof request.headers[header] !== 'number') {
          return badRequest(new InvalidParamError(header));
        }
      }

      const {
        'x-current-page': currentPage,
        'x-items-per-page': itemsPerPage
      } = request.headers;

      const products = await this.listProductsUseCase.execute({
        currentPage,
        itemsPerPage
      });

      return ok(products);
    } catch (error: any) {
      return serverError(error);
    }
  }
}