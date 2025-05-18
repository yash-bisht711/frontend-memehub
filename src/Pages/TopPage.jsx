import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import MainBody from "../components/MainBody";
import MemeCard from "../components/Memecard";

function TopPage() {
    const BASE_URL = 'https://backend-memehub-production.up.railway.app/api/posts/'
    let { time } = useParams()
    const [posts, setPosts] = useState([])

    const getData = async (url) => {
        try {
            const response = await axios.get(url);
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        switch (time) {
            case 'today':
                getData(BASE_URL + '?top_day=true')
                break;

            case 'week':
                getData(BASE_URL + '?top_week=true')
                break;

            default:
                getData(BASE_URL + '?top_all=true')
                break;
        }
    }, [time])

    // useEffect(() => console.log(posts), [posts])

    return (
        <MainBody>
            {posts.map((meme) => (
                
                // <h1>{meme.description}</h1>
                <MemeCard key={meme.id} meme={meme} />
            ))}
        </MainBody>
    )
}

export default TopPage;