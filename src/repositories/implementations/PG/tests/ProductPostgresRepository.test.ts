import { ProductPostgresRepository } from "../Repositories/ProductPostgresRepository";
import { AddProduct, Product } from "../../../../entities/Product";

function makeSut() {
  class ProductPostgresRepositoryStub implements ProductPostgresRepository {
    async create(data: AddProduct): Promise<Product> {
      const newProduct = new Product();
      Object.assign(newProduct, { id: 1 }, data);
      return newProduct;
    }
  }

  const sut = new ProductPostgresRepositoryStub();
  return { sut };
}

const fakeProduct = (): AddProduct => {
  return {
    name: "any_name",
    cost: 1,
    price: 1,
    quantity: 1,
    barcode: "any_barcode",
    description: "any_description",
    category: "any_category",
    unit: "any_unit",
    expirationDate: new Date(2023, 1, 1, 1, 1, 1, 1),
    providerCode: "any_providerCode",
    ean: "any_ean",
    ncm: "any_ncm",
    cest: "any_cest",
    origin: "any_origin",
    liquidWeight: 1,
    bruteWeight: 1,
    width: 1,
    height: 1,
    length: 1,
  };
}

describe('Product Postgres Repository', () => {
  it('Should return a product on success', async () => {
    const { sut } = makeSut();
    const product = await sut.create(fakeProduct());
    expect(product).toEqual({ id: 1, ...fakeProduct() });
  });

  it('should be able to create a new product', async () => {
    const sut = new ProductPostgresRepository();
    const product = await sut.create(fakeProduct());
    expect(product).toHaveProperty('id');
  });
})