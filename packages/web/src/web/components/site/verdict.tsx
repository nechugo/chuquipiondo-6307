import { Reveal } from "./reveal";
import { EyebrowPill } from "./primitives";

export function Verdict() {
  return (
    <section className="pt-20 pb-24 sm:pb-28">
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <EyebrowPill>El veredicto</EyebrowPill>
          <p className="display mt-7 text-[clamp(1.6rem,3.1vw,2.4rem)] text-foreground">
            El código está, en general, bien construido. Y aun así un tema entero llevaba cinco días
            caído con el CI en verde.
          </p>
          <p className="mx-auto mt-7 max-w-2xl text-[1.02rem] leading-relaxed text-muted-foreground">
            Guardas de acceso en el 100% de los archivos, nonces y capacidades donde toca, cero
            colisiones de funciones y cero claves en el código. El problema no era la calidad del
            código: era que nada lo estaba comprobando en el sitio correcto.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
