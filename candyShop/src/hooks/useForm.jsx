export const useForm = () => {
    const serialize = (form) => {
        const data = new FormData(form);
        const formData = {};
        for (let [name, value] of data) {
            formData[name] = value;
        }
        return formData;
    }
    return {
        serialize
    }
}