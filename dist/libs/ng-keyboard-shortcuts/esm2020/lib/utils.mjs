export function isFunction(x) {
    return typeof x === 'function';
}
export function invert(obj) {
    const new_obj = {};
    for (const prop in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(prop)) {
            new_obj[obj[prop]] = prop;
        }
    }
    return new_obj;
}
export const any = (fn, list) => {
    let idx = 0;
    while (idx < list.length) {
        if (fn(list[idx])) {
            return true;
        }
        idx += 1;
    }
    return false;
};
export const identity = (x) => x;
/**
 * @ignore
 * @param x
 * @returns boolean
 */
export const isNill = (x) => x == null;
/**
 * @ignore
 * @param xs
 * @param key
 * @returns any
 */
export function groupBy(xs, key) {
    return xs.reduce((result, x) => ({
        ...result,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        [x[key]]: [...(result[x[key]] || []), x]
    }), {});
}
/**
 * @ignore
 * @param first
 * @param second
 * @returns any[]
 */
export const difference = (first, second) => first.filter(item => !second.includes(item));
/**
 * @ignore
 * @param preds
 * @returns (...args) => boolean;
 */
export const allPass = preds => (...args) => {
    let idx = 0;
    const len = preds.length;
    while (idx < len) {
        if (!preds[idx].apply(this, args)) {
            return false;
        }
        idx += 1;
    }
    return true;
};
export const prop = prop => object => object[prop];
export const minMaxArrayProp = type => (property, array) => 
// eslint-disable-next-line prefer-spread
Math[type].apply(Math, array.map(prop(property)));
export const maxArrayProp = (property, array) => {
    return array.reduce((acc, curr) => {
        const propFn = prop(property);
        const currentValue = propFn(curr);
        const previousValue = propFn(acc);
        return currentValue > previousValue ? curr : acc;
    }, { [property]: 0 });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL25nLWtleWJvYXJkLXNob3J0Y3V0cy9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sVUFBVSxVQUFVLENBQUMsQ0FBTTtJQUM3QixPQUFPLE9BQU8sQ0FBQyxLQUFLLFVBQVUsQ0FBQztBQUNuQyxDQUFDO0FBRUQsTUFBTSxVQUFVLE1BQU0sQ0FBcUMsR0FBaUI7SUFDeEUsTUFBTSxPQUFPLEdBQTRDLEVBQUUsQ0FBQztJQUU1RCxLQUFLLE1BQU0sSUFBSSxJQUFJLEdBQUcsRUFBRTtRQUNwQixpREFBaUQ7UUFDakQsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDN0I7S0FDSjtJQUNELE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxFQUFnQyxFQUFFLElBQWUsRUFBRSxFQUFFO0lBQ3JFLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNaLE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDdEIsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDZixPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUNaO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFdEM7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztBQUVoRDs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxPQUFPLENBQStCLEVBQWdCLEVBQUUsR0FBTTtJQUMxRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQ1osQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ1osR0FBRyxNQUFNO1FBQ1QsNkRBQTZEO1FBQzdELGFBQWE7UUFDYixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDM0MsQ0FBQyxFQUNGLEVBQW9CLENBQ3ZCLENBQUM7QUFDTixDQUFDO0FBR0Q7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxLQUFZLEVBQUUsTUFBYSxFQUFFLEVBQUUsQ0FDdEQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBRWpEOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUU7SUFDeEMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ1osTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUN6QixPQUFPLEdBQUcsR0FBRyxHQUFHLEVBQUU7UUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDL0IsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxHQUFHLElBQUksQ0FBQyxDQUFDO0tBQ1o7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDLENBQUM7QUFDRixNQUFNLENBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUVuRCxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRTtBQUN2RCx5Q0FBeUM7QUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRXRELE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUM1QyxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQ2YsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDVixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUIsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQyxPQUFPLFlBQVksR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ3JELENBQUMsRUFDRCxFQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQ2xCLENBQUM7QUFDTixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gaXNGdW5jdGlvbih4OiBhbnkpOiB4IGlzICgpID0+IHZvaWQge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW52ZXJ0PFQgZXh0ZW5kcyBzdHJpbmcsIFUgZXh0ZW5kcyBzdHJpbmc+KG9iajogUmVjb3JkPFQsIFU+KSB7XHJcbiAgICBjb25zdCBuZXdfb2JqOiBSZWNvcmQ8RXh0cmFjdDxzdHJpbmcsIHN0cmluZz4sIHN0cmluZz4gPSB7fTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gb2JqKSB7XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xyXG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocHJvcCkpIHtcclxuICAgICAgICAgICAgbmV3X29ialtvYmpbcHJvcF1dID0gcHJvcDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3X29iajtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGFueSA9IChmbjogKHBhcmFtczogdW5rbm93bikgPT4gYm9vbGVhbiwgbGlzdDogdW5rbm93bltdKSA9PiB7XHJcbiAgICBsZXQgaWR4ID0gMDtcclxuICAgIHdoaWxlIChpZHggPCBsaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgIGlmIChmbihsaXN0W2lkeF0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZHggKz0gMTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpZGVudGl0eSA9ICh4OiBhbnkpID0+IHg7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBAcGFyYW0geFxyXG4gKiBAcmV0dXJucyBib29sZWFuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgaXNOaWxsID0gKHg6IHVua25vd24pID0+IHggPT0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIEBwYXJhbSB4c1xyXG4gKiBAcGFyYW0ga2V5XHJcbiAqIEByZXR1cm5zIGFueVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdyb3VwQnk8VCwgSyBleHRlbmRzIHN0cmluZyA9IHN0cmluZz4oeHM6IHJlYWRvbmx5IFRbXSwga2V5OiBLKTogUmVjb3JkPEssIFRbXT4ge1xyXG4gICAgcmV0dXJuIHhzLnJlZHVjZShcclxuICAgICAgICAocmVzdWx0LCB4KSA9PiAoe1xyXG4gICAgICAgICAgICAuLi5yZXN1bHQsXHJcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnRcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBbeFtrZXldXTogWy4uLihyZXN1bHRbeFtrZXldXSB8fCBbXSksIHhdXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAge30gYXMgUmVjb3JkPEssIFRbXT5cclxuICAgICk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBAcGFyYW0gZmlyc3RcclxuICogQHBhcmFtIHNlY29uZFxyXG4gKiBAcmV0dXJucyBhbnlbXVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGRpZmZlcmVuY2UgPSAoZmlyc3Q6IGFueVtdLCBzZWNvbmQ6IGFueVtdKSA9PlxyXG4gICAgZmlyc3QuZmlsdGVyKGl0ZW0gPT4gIXNlY29uZC5pbmNsdWRlcyhpdGVtKSk7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBAcGFyYW0gcHJlZHNcclxuICogQHJldHVybnMgKC4uLmFyZ3MpID0+IGJvb2xlYW47XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgYWxsUGFzcyA9IHByZWRzID0+ICguLi5hcmdzKSA9PiB7XHJcbiAgICBsZXQgaWR4ID0gMDtcclxuICAgIGNvbnN0IGxlbiA9IHByZWRzLmxlbmd0aDtcclxuICAgIHdoaWxlIChpZHggPCBsZW4pIHtcclxuICAgICAgICBpZiAoIXByZWRzW2lkeF0uYXBwbHkodGhpcywgYXJncykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZHggKz0gMTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59O1xyXG5leHBvcnQgY29uc3QgcHJvcCA9IHByb3AgPT4gb2JqZWN0ID0+IG9iamVjdFtwcm9wXTtcclxuXHJcbmV4cG9ydCBjb25zdCBtaW5NYXhBcnJheVByb3AgPSB0eXBlID0+IChwcm9wZXJ0eSwgYXJyYXkpID0+XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLXNwcmVhZFxyXG4gICAgTWF0aFt0eXBlXS5hcHBseShNYXRoLCBhcnJheS5tYXAocHJvcChwcm9wZXJ0eSkpKTtcclxuXHJcbmV4cG9ydCBjb25zdCBtYXhBcnJheVByb3AgPSAocHJvcGVydHksIGFycmF5KSA9PiB7XHJcbiAgICByZXR1cm4gYXJyYXkucmVkdWNlKFxyXG4gICAgICAgIChhY2MsIGN1cnIpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcHJvcEZuID0gcHJvcChwcm9wZXJ0eSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHByb3BGbihjdXJyKTtcclxuICAgICAgICAgICAgY29uc3QgcHJldmlvdXNWYWx1ZSA9IHByb3BGbihhY2MpO1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFZhbHVlID4gcHJldmlvdXNWYWx1ZSA/IGN1cnIgOiBhY2M7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7W3Byb3BlcnR5XTogMH1cclxuICAgICk7XHJcbn07XHJcbiJdfQ==