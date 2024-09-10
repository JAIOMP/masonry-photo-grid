export const debounce = (func: Function, delay: number) => {
    let timer: number | undefined;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
};