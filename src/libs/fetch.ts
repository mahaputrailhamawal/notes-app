export async function fetchData<T>(url:string, tag?:string) {
    try{
        const res = await fetch(url);

        if (res.status !== 200){
            throw new Error(`Error fetching data with tag ${tag}`);
        }

        const data = (await res.json()) as T;
        return data;
    } catch (error){
        console.log(error);
    }
}