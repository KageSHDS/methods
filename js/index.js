const s = 33

function equationOfTheSegment(interval) {
    return interval ** 3 - 0.1 * s * interval ** 2 + 0.01 * s ** 2 * interval - 0.001 * s ** 3
}

console.log(
	equationOfTheSegment(0), //* так как оба значения отрицательные, необходимо расширить интервал или изменить его
	equationOfTheSegment(3), //* значение положительное мы можем использовать интервал [3;4]
	equationOfTheSegment(4)
)


let countDX = 0
function theDichotomy(a, b, eps) { //* a, b -наш интервал eps- допустимая погрешность
    let root = null //* переменная используется для хранения значения корня
    // let count = 0
    while (Math.abs(equationOfTheSegment(b) - equationOfTheSegment(a)) > eps){ //* продолжаем итерации, пока разность значений функции на границах больше заданной точности  
        const mid = (a + b) / 2; //* вычисляем середину интервала
        countDX++
        
        console.log(`Iteration ${countDX}: a = ${a}, b = ${b}, mid = ${mid}, f(mid) = ${equationOfTheSegment(mid)}`);

        if (equationOfTheSegment(mid) === 0 || Math.abs(equationOfTheSegment(mid)) < eps) { //* если середина =0 или меньше погрешности, то мы нашли нужный корень 
            root = mid;
            break
        }
        else if (equationOfTheSegment(a) * equationOfTheSegment(mid) < 0){ //* если a и mid имеют разные знаки, то корень находится между ними и мы обновляем b
            b = mid; //*
        } else {
					a = mid //* в противном случае интеграл находится в интервале от b до mid и мы обновляем а
				}
    }
    
    let result;

    if (root === null){
        // console.log('Root not found')
        result = 'Root not found';
    } else {
        // console.log(`x = ${root}`)
        result = `x = ${root}`;
    }
    // console.log(result);
    return result;
};

const del = theDichotomy(3,4, 0.0001);
console.log(`metodtheDichotomy  ${del}, ${countDX}`)






function someFunction(interval) {
	return (0.1 * s * interval**2 - 0.01 * s**2 * interval + 0.001 * s**3) ** (1 / 3) //* выражаем x через некоторую функцию
}

let countIT = 0

function methodIteration(start, doorstep) { //* начинаем с начального значения и вычисляем x1
    let x1 = someFunction(start);
    while (Math.abs(x1 - start) > doorstep) { //* вычисляем до тех пор пока разница между текущим и предыдущим значением х буде меньше порога 
        countIT++;
        start = x1;
        x1 = someFunction(start);

        console.log(`Iteration ${countIT}: start = ${start}, x1 = ${x1}`)
    }
    return x1 //* возвращаем приближенный корень
}
const start = 1.5;
const doorstep = 0.0001;

resultIteration = (methodIteration(start, doorstep))
console.log(`methodIteration = ${resultIteration.toFixed(5)}, ${countIT}`)






let countNT = 0;
//* a и b границы интервала, f - функция корень которой мы ищем, 
//* f1 - первая производная, f2 - вторая производная, eps - допустимая погрешность
function methodNewton(a, b, equationOfTheSegment, derivative1, derivative2, eps) {
	//* выбираем начальное приближение t
	let t = equationOfTheSegment(a) * derivative2(a) > 0 ? a : b

	let x
	//* цикл продолжается до тех пор пока не будет найден нужный корень
	do {
        countNT++;
		x = t - equationOfTheSegment(t) / derivative1(t) //* шаг метода ньютона

        console.log(`Iteration ${countNT}: t = ${t}, x = ${x}`)

		if (Math.abs(t - x) <= eps) { //* проверка точности 
			break
		}
		t = x
	} while (true)
	return t
}

function derivative1(interval){
    return 3 * interval ** 2 - 2 * 0.1 * s * interval + 0.01 * s ** 2
}

function derivative2(interval){
    return 6 * interval - 2 * 0.1 * s
}

const aNewton = 3;
const bNewton = 4;
const eps = 0.0001;

const xNewton = methodNewton(aNewton, bNewton, equationOfTheSegment, derivative1, derivative2, eps);
console.log(`$methodNewton - ${xNewton.toFixed(5)}, ${countNT}`)




let countXD = 0;
function metodXord(a, b, equationOfTheSegment, eps){
    let x //* переменная для хранения текущего корня функции
    while (true) {
        countXD++;
        //* формула секущих
        x = (a * equationOfTheSegment(b) - b * equationOfTheSegment(a)) / (equationOfTheSegment(b) - equationOfTheSegment(a));
        
        console.log(`Iteration ${countXD}: x = ${x}, f(x) = ${equationOfTheSegment(x)}`);
        
        if (equationOfTheSegment(x) === 0){
            return x; //* искомый корень
        }
        else if (equationOfTheSegment(a) * equationOfTheSegment(x) > 0){
            a = x;
        } else {
            b = x;
        }

        if (Math.abs(equationOfTheSegment(x)) <= eps){
            break;
        }
    }
    return x;
}

if (equationOfTheSegment(aNewton) * equationOfTheSegment(bNewton) >= 0) {
	console.error(
		'Значения функции в границах интервала должны иметь разные знаки.'
	)
} else {
	// Нахождение корня
	const x1 = metodXord(aNewton, bNewton, equationOfTheSegment, eps)

	// Вывод результата
	// console.log(`x=${x1} nF=${equationOfTheSegment(x1)}`)
    console.log(`metodXord  x=${x1.toFixed(5)}, ${countXD}`)
}





let countXK = 0;
function metodXordAndKasatel(a, b, eps) {
	let t, x

	if (equationOfTheSegment(a) * derivative2(a) > 0) {
		t = a
		x = b
	} else {
		t = b
		x = a
	}

	while (true) {
        countXK++;
		t = t - equationOfTheSegment(t) / derivative1(t) // Метод Ньютона
		x =
			(t * equationOfTheSegment(x) - x * equationOfTheSegment(t)) /
			(equationOfTheSegment(x) - equationOfTheSegment(t)) // Метод секущих

            console.log(`Iteration ${countXK}: x = ${x}, f(t) = ${equationOfTheSegment(t)}`);
            // console.log(`Iteration ${countXK}: t = ${t}, x = ${x}, f(t) = ${equationOfTheSegment(t)}, f(x) = ${equationOfTheSegment(x)}`);

		if (Math.abs(x - t) <= eps) {
			// Проверка на точность
			break
		}
	}

	return 0.5 * (t + x) // Возвращаем среднее значение t и x
}


const XK = metodXordAndKasatel(aNewton, bNewton, eps)
console.log(`metodXordAndKasatel x=${XK.toFixed(5)}, ${countXK}`)
