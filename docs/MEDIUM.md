
# Auditoría de seguridad

## Importante para alertar a la comunidad

Hace unos meses, más precisamente a principios del 2020, un grupo de personas comenzaron a promocionar un sistema mal llamado de "marketing matricial" haciendo uso de la tecnologia blockchain y contratos inteligentes. 

Se entiende que este tipo de "sistemas" son derivaciones más complejas y sofisticadas de las famosas estafas piramidales o "[esquemas Ponzi](https://es.wikipedia.org/wiki/Esquema_Ponzi)". Donde se proporciona ganancia a las personas por medio de la recomendación:
 del sistema a otras personas. Las cuales tienen que hacer una contribución para ingresar al sistema. Organizaciones populares de redes de marketing son conocidas y existen amplios informes de investigación y documentales que estudian su funcionamiento, por ejemplo [Betting on zero](https://es.wikipedia.org/wiki/Betting_on_Zero).

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

### ¿Como se procedió?
De acuerdo a nuestra experiencia, hicimos un relevamiento del material necesario:

- Descargamos el código y lo ejecutamos en un entorno local;
- Revisamos cada linea y documentamos el comportamiento;
- Desarrollamos código de prueba para verificar el funcionamiento del contracto;
- Elaboramos un reporte y aumentamos la documentación 

## Resumen

### Lógica general del esquema 

- El contrato inteligente define en el instante de la creación a una cuenta propietaria de la estructura;
- Una nueva cuenta podrá registrarse en la estructura enviando un monto y bajo referencia de una cuenta que forme parte de la estructura o de la cuenta propietaria por defecto;
- Cada cuenta tiene asignado una tabla (x3) que registrará tres referidos y una tabla (x6) que registrará dos referidos y cuatro referidos de referidos o de segundo nivel;
- Existen doce niveles de tablas que pueden ser desbloqueadas mediante un pago extra; Cada nivel duplica el costo de desbloqueo del nivel anterior; 
- Cuando las tablas se completan, se bloquean y deben ser desbloqueadas nuevamente;
- Las cuentas referidas en un nivel inicial, en caso de desbloquear un nivel superior que el referente no tenga desbloqueado pasan a ser referidas por el referente superior inmediato desbloqueado en el nivel en cuestion;
- De la misma forma, si el referente no tiene desbloqueada la tabla de un nivel, el recibo de una comision por un nuevo referido será asignado a un referente inmediato superior con la tabla de ese nivel desbloqueada;
- La cuenta propietaria de la estructura es la raiz de referentes ..

**1. Cobertura de tests**

- Una vez que se completa la tabla del primer nivel, la misma se desbloquea automáticamente consumiendo la comisión del siguiente referido de la cuenta referente. [no se verificó con el resto de los niveles]

![](/docs/images/coverage.png)

**2. Reporte de Gas**

- A medida que los niveles de profundidad de la estructura aumentan, el costo de la operación de registrarse para una nueva cuenta aumenta en terminos de gas.

![](/docs/images/gasReporter.png)


**3. Problemas encontrados**

- En una primera examinación del código se observa que no es limpio, presenta una estructura extraña en su escritura, cuenta con bifurcaciones de código redundantes y no está bien documentado ni comentado.

|    |Confianza  |Severidad |
|----|-----------|----------|
|`Error de lógica` | Crítico | Crítico            
|`Funciones de transferencias de fondos no protegidas`|Medio | Alto |
|`Varias precauciones a considerar`|Medio | Información |


**4. Problemas detallados**


|    |Confianza  |Severidad |
|----|-----------|----------|
|`Logical error` | Crítico | Crítico            

    updateX6ReferrerSecondLevel(address,address,uint8)[#335]


Descripción:


Se encontró un error de identación. Como consecuencia, una rama de la lógica nunca se ejecutará.

 Recomendación:


    // [331-340]    
    if (x6.length == 2) {    
	    if (x6[0] == referrerAddress ||    
		    x6[1] == referrerAddress) {		    
                users[users[referrerAddress].x6Matrix[level].currentReferrer].x6Matrix[level].closedPart = referrerAddress;
        } // add this line to close the `if (x6.length == 2)` statement
    } else if (x6.length == 1) {    
        if (x6[0] == referrerAddress) {    
        users[users[referrerAddress].x6Matrix[level].currentReferrer].x6Matrix[level].closedPart = referrerAddress;    
        }	    
    }    
    } // delete this line that close the `if (x6.length == 2)` with `if (x6.length == 1)` statement inside
    

|    |Confianza  |Severidad |
|----|-----------|----------|
|`Functions that send ether to arbitrary destinations`|Medio | Alto |


    sendETHDividends(address,address,uint8,uint8) [#435]

Llamadas peligrosas:

    ! address(uint160(receiver)).send(levelPrice[level]) [#438]
      address(uint160(receiver)).transfer(address(this).balance) [#439]


Descripción:


Llamada desprotegida a una función que ejecuta el envío de fondos a una dirección arbitraria.

Escenario de explotación:

    contract ArbitrarySend{

	    address destination;

	    function setDestination(){
		    destination = msg.sender;
		    } 

	    function withdraw() public{
		    destination.transfer(this.balance);
		    }
	    }


> Bob calls setDestination and withdraw. As a result he withdraws the
> contract's balance.

Recomendación:


Asegúrarse de que un usuario arbitrario no pueda retirar fondos no autorizados.



|    |Confianza  |Severidad |
|----|-----------|----------|
|`Local variable never initialized` | Medio| Medio            |


    findEthReceiver(address,address,uint8,uint8).isExtraDividends

Descripción:

Variables locales no inicializadas.

Escenario de explotación:

    contract Uninitialized is Owner{
    
	    function withdraw() payable public onlyOwner{
	    
		    address to;
		    
		    to.transfer(this.balance)
		    
		    }
 
    }

> Bob calls transfer. As a result, the ethers are sent to the address
> 0x0 and are lost.


Recomendación:


Inicializar todas las variables. Si una variable está destinada a inicializarse a cero, se debe configrar explícitamente a cero.


|    |Confianza  |Severidad |
|----|-----------|----------|
|`Reentrancy vulnerabilities`| Medio | Informacional|


Reentradas en:

    - buyNewLevel(uint8,uint8) [#116]
    - registration(address,address) [#152]
    - sendETHDividends(address,address,uint8,uint8) [#435]
    - updateX3Referrer(address,address,uint8) [#192]


Descripción:


Detección de error de reentrada. Solo se informe la reentrada basada en transferencia o envío.
  
Escenario de explotación:

    function callme(){
	    msg.sender.transfer(balances[msg.sender]):
	    balances[msg.sender] = 0;
	    }

> send and transfer does not protect from reentrancies in case of
> gas-price change.

  
Recomendación:


Aplicar el patrón de verificación-efectos-interacciones.


|    |Confianza  |Severidad |
|----|-----------|----------|
|`Assembly usage`|Alto| Informacional|


    registration(address,address)

Descripción:


El uso del assembly es propenso a errores y debe evitarse.
  
  
 Recomendación:



No usar assembly.


|    |Confianza  |Severidad |
|----|-----------|----------|
|`Incorrect versions of Solidity`|Alto| Informacional|


    Pragma version>=0.4.23<0.6.0 [#26] allows old versions

Descripción:


Solc lanza frecuentemente nuevas versiones del compilador. El uso de una versión anterior impide el acceso a las nuevas comprobaciones de seguridad de Solidity. 
 
Recomendación:


Usar Solidity 0.4.25 o 0.5.11. Considere usar la última versión de Solidity 

|    |Confianza  |Severidad |
|----|-----------|----------|
|`Conformance to Solidity naming conventions`|Alto| Informacional|



    Parameter findEthReceiver(address,address,uint8,uint8)._from [#409] is not in mixedCase
    Parameter sendETHDividends(address,address,uint8,uint8)._from [#435] is not in mixedCase

Descripción:


Solidity define una convención de nomenclatura que debe seguirse.

Rules exceptions

    Allow constant variables name/symbol/decimals to be lowercase (ERC20)
    
    Allow _ at the beginning of the mixed_case match for private variables and unused parameters.

Recomendación:


Seguir la convención de nomenclatura Solidity.


|    |Confianza  |Severidad |
|----|-----------|----------|
|`Public function that could be declared as external`|Alto| Optimization|


    - SmartMatrixForsage.usersActiveX3Levels(address,uint8) [#383]
    
    - SmartMatrixForsage.usersActiveX6Levels(address,uint8) [#387]
    
    - SmartMatrixForsage.usersX3Matrix(address,uint8) [#391]
    
    - SmartMatrixForsage.usersX6Matrix(address,uint8) [#397]

Descripción:


Las funciones públicas que nunca son convocadas por el contrato deben declararse externas para ahorrar gas.

Recomendación:


Utilice el atributo externo para funciones que nunca se invocan desde el contrato.

## Conclusion

A pesar de que la auditoría se encuentra en un estado avanzado, el proceso no fue terminado. Quedan pendientes en iteraciones futuras
- desarrollo de más test para elevar los números de coverage
- mejorar la documentación

Sin embargo, las iteraciones ejecutadas permiten resaltar las graves fallas del contrato inteligente que ejecuta este sistema.

La examinación del código revela diferencias entre la descripción:
 general del esquema a la que se obtuvo acceso y el accionar implementado en el contrato inteligente.

Independientemente de que el mismo ya está desplegado en la red principal, si esta auditoría se hubiese ejecutado en un momento anterior se recomendaría postergar esta acción hasta resolver los puntos de gravedad critico y altos destacados.

Finalmente, el costo en terminos de gas de la operación de registrar una nueva cuenta es proporcional a los niveles de profundidad de la estructura. Esto perjudica a los futuros referidos y limita al sistema.

Debido a todo lo mencionado, se recomiendo fuertemente no interactuar con el contrato, y no participar del esquema.
