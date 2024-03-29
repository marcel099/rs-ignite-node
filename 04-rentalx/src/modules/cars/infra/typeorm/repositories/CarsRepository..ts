import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/Car";

export class CarsRepository implements ICarsRepository {
  constructor() {
    this.repository = getRepository(Car);
  }

  private repository: Repository<Car>;

  async create({
    id,
    name,
    description,
    license_plate,
    brand,
    daily_rate,
    fine_amount,
    category_id,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      id,
      name,
      description,
      license_plate,
      brand,
      daily_rate,
      fine_amount,
      category_id,
      specifications,
    });

    await this.repository.save(car);

    return car;
  }

  async findAvailable(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true });

    if (name) {
      carsQuery.andWhere("c.name = :name", { name });
    }

    if (brand) {
      carsQuery.andWhere("c.brand = :brand", { brand });
    }

    if (category_id) {
      carsQuery.andWhere("c.category_id = :category_id", { category_id });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne(id);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      license_plate,
    });

    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<Car> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id", { id })
      .execute();

    const car = await this.repository.findOne(id);

    return car;
  }
}
