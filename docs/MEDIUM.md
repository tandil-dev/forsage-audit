
# Auditoría de seguridad

## Importante para alertar a la comunidad

Hace unos meses, más precisamente a principios del 2020, un grupo de personas comenzaron a promocionar un sistema mal llamado de "marketing matricial" haciendo uso de la tecnologia blockchain y contratos inteligentes. 

Se entiende que este tipo de "sistemas" son derivaciones más complejas y sofisticadas de las famosas estafas piramidales o "[esquemas Ponzi](https://es.wikipedia.org/wiki/Esquema_Ponzi)". Donde se proporciona ganancia a las personas por medio de la recomendación del sistema a otras personas. Las cuales tienen que hacer una contribución para ingresar al sistema. Organizaciones populares de redes de marketing son conocidas y existen amplios informes de investigación y documentales que estudian su funcionamiento, por ejemplo [Betting on zero](https://es.wikipedia.org/wiki/Betting_on_Zero).

Particularmente, el grupo de personas en cuestion organiza reuniones donde explican algunas cuestiones tecnicas de la tecnologia blockchain y la mezclan con algunas especificaciones del esquema que promocionan e introducen a las personas lentamente a su sistema. 

Esto llamó nuestra atención, debido a nuestra activa participación en la comunidad en conjunto con personas comprometidas en la enseñanza de la tecnología hemos estado esforzandonos desde mediados del 2017 para achicar la brecha de conocimiento. Este grupo de personas entorpece nuestros esfuerzos y hemos sido consultados por un significativo número de personas respecto de la seguridad de estos mecanismos. Esto nos ah preocupado y empezamos a alertar a nuestros contactos, pues NO queremos que las personas sean engañadas con este tipo de sistemas. 

Se visitó el sitio Web del grupo [Forsage](https://forsage.io/) y encontramos el contrato publicado en la red Ethereum para ejecutar su sistema ([Forsage Smart Contract](https://etherscan.io/address/0x5acc84a3e955Bdd76467d3348077d003f00fFB97) ).

En primera instancia la misma organización desplegó previamente varios contratos inteligentes con similar lógica, que actualmente se están ejecutando bajo organizaciones con diferentes nombres, por ejemplo [Smart Way Smart Contract](https://etherscan.io/address/0x64a0fe42e1295456246abbc51d8708472856170c).

Luego de observar esto, se decidió revisar el código del contrato inteligente para entender su comportamiento y desde nuestro punto de vista explicar porque NO es una buena idea participar de esto. La revisión se llevó a cabo de forma similar a como se ejecutaría una auditoria. 

### ¿Qué es una auditoría?
La finalidad de una auditoría es verificar que el sistema funciona según lo previsto. Por lo que hemos revisado completamente la arquitectura y la base del código del sistema, y luego hemos escrito un informe que incluye comentarios procesables para cada problema encontrado.

### ¿Qué se encuentra comunmente en un informe de auditoría?
El informe describe posibles problemas en el código con recomendaciones prácticas para protegerse contra posibles vectores de ataque, junto con un análisis general de la dinámica del sistema, que refleja tanto los patrones de seguridad de vanguardia como las oportunidades para mejorar la calidad y madurez general del proyecto.

### ¿El informe es privado?
Cuando se solicita el trabajo si. En privado se envia el informe a su equipo para poder abordar los problemas encontrados. Publicar el informe después es opcional, pero se recomienda como una forma de contribuir a la seguridad del ecosistema.

### ¿Con qué tecnologías se trabaja?
Desde lenguajes y compiladores hasta sistemas de contratos inteligentes, protocolos y aplicaciones.

### ¿Cómo es recomendable una auditoría externa?
Los mejores resultados y los hallazgos más interesantes ocurren cuando el código ha sido probado y documentado y está listo para su implementación. Esta lista de verificación enumera algunas medidas de calidad básicas que debe considerar antes de entregar su próximo proyecto para una auditoría externa.

## Resumen

### ¿Como se procedió?
De acuerdo a nuestra experiencia, hicimos un relevamiento del material necesario:

- Descargamos el código y lo ejecutamos en un entorno local;
- Revisamos cada linea y documentamos el comportamiento;
- Desarrollamos código de prueba para verificar el funcionamiento del contracto;
- Elaboramos un reporte y aumentamos la documentación 

### Descripción general de la lógica del esquema 
- El contrato inteligente define en el instante de la creación a una cuenta propietaria de la estructura;
- Una nueva cuenta podrá registrarse en la estructura enviando un monto y bajo referencia de una cuenta que forme parte de la estructura o de la cuenta propietaria por defecto;
- Cada cuenta tiene asignado una tabla (x3) que registrará tres referidos y una tabla (x6) que registrará dos referidos y cuatro referidos de referidos o de segundo nivel;
- Existen doce niveles de tablas que pueden ser desbloqueadas mediante un pago extra; Cada nivel duplica el costo de desbloqueo del nivel anterior; 
- Cuando las tablas se completan, se bloquean y deben ser desbloqueadas nuevamente;
- Las cuentas referidas en un nivel inicial, en caso de desbloquear un nivel superior que el referente no tenga desbloqueado pasan a ser referidas por el referente superior inmediato desbloqueado en el nivel en cuestion;
- De la misma forma, si el referente no tiene desbloqueada la tabla de un nivel, el recibo de una comision por un nuevo referido será asignado a un referente inmediato superior con la tabla de ese nivel desbloqueada;
- La cuenta propietaria de la estructura es la raiz de referentes ..

En una primera examinación del código se encuentra que:
- El código no es limpio, presenta una estructura extraña en su escritura, cuenta con bifurcaciones de código redundantes y no está bien documentado ni comentado.
- A medida que los niveles de profundidad de la estructura aumentan, el costo de registrarse para una nueva cuenta aumenta.
- Una vez que se completa la tabla del primer nivel, la misma se desbloquea automáticamente consumiendo la comisión del siguiente referido de la cuenta referente. [no se verificó con el resto de los niveles]
- Las restricciones para recibir la ganancia por referido no se verifican para la cuenta dueña de la estructura.


**1. Problemas encontrados**
|    |Confianza                          |Severidad                     |
|----------------|-------------------------------|-----------------------------|
|`Errores de lógica` | Critico | Critico            
|`Funciones de transferencias de fondos no protegidas`|Medio | Alto |
|`Diferentes precauciones a considerar`|Medio | Información |

**2. Cobertura de tests**

![](/docs/images/coverage.png)

**3. Reporte de Gas**

![](/docs/images/gasReporter.png)


