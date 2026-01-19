import { describe, it, expect } from "vitest";
import { crearAdminPorDefecto } from "../src/utils/init";

describe("crearAdminPorDefecto", () => {

  it("crea el usuario administrador", () => {
    global.localStorage = {
      getItem: () => null,
      setItem: (key, value) => {
        global.guardado = value;
      }
    };

    crearAdminPorDefecto();

    const usuarios = JSON.parse(global.guardado);

    expect(usuarios[0].rol).toBe("admin");
  });

});
