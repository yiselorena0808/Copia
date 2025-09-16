import Cargo from "#models/cargo";

export default class CargoService {
  async todosCargos() {
    return await Cargo.all();
  }

  async crearCargos(datos: any) {
    return await Cargo.create(datos);
  }

  async actualizarCargos(id_cargo: number, datos: any) {
    const cargo = await Cargo.findOrFail(id_cargo);
    cargo.merge(datos);
    await cargo.save();
    return cargo;
  }

  async eliminarCargos(id_cargo: number) {
    const cargo = await Cargo.findOrFail(id_cargo);
    await cargo.delete();
    return cargo;
  }
}
