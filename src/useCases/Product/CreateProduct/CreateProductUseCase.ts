import { AddProduct, Product } from "../../../entities/Product";
import { ICreateProductRepository } from "../../../repositories/ProductRepository";
import { ICreateProductUseCase } from "../../Presentation/Protocols/useCases/ProductUseCases";
import { ICreateProductDTO } from "./CreateProductDTO";

export class CreateProductUseCase implements ICreateProductUseCase {
  constructor(
    private productRepository: ICreateProductRepository
  ) { }

  async execute(data: AddProduct): Promise<Product> {
    const product = new Product();
    Object.assign(product, data);
    const newProduct = await this.productRepository.create(product);
    return Promise.resolve(newProduct);
  }
}