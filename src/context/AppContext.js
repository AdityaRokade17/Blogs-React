import { createContext, useState } from "react";
import {baseUrl} from "../baseUrl";

//step 1
export const AppContext = createContext();

export default function AppContextProvider({children}){

    const [posts, setPosts] = useState([]);
    const [loading , setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);


    //Fetch blog

    async function fetchBlogPosts(page = 1) {
        setLoading(true);
        let url = `${baseUrl}?page=${page}`;
        if(tag) {
            url += `&tag=${tag}`;
        }
        if(category){
            url += `&category=${category}`;
        }
        
        try{
            const res = await fetch(url);
            const data = await res.json();

            if(!data.posts || data.posts.length === 0)
                throw new Error("somethig Went Wrong!")

            console.log("api response", data);

            setPage(data.page);
            setPosts(data.posts);
            setTotalPages(data.totalPages);

        }catch(error){
            console.log("error to fetch");
            setPage(1);
            setPosts([]);
            setTotalPages(null);
        }

        setLoading(false);

    }

    function handlePageChange(page){

        setPage(page);
        fetchBlogPosts(page);

    }

    const value= {
        posts,
        setPosts,
        loading,
        setLoading,
        page,
        setPage,
        totalPages,
        setTotalPages,
        fetchBlogPosts,
        handlePageChange
    };
    

    //step 2
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;

}


