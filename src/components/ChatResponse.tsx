import { useEffect, useState } from "react";
import { useSearchState } from '@yext/search-headless-react';


interface Notes {
    collectedData: Object,
    currentGoal: string,
    currentStepIndices: number[],
    goalFirstMsgIndex: number,
}

interface ChatResponse {
    meta: {
        errors: Object[],
        uuid: string
    },
    response: {
        conversationId: string,
        message: {
            timestamp: string,
            text: string,
            source: string
        }
        notes: Notes[],
    }
}


export default function ChatResponse() {
    const mostRecentSearch = useSearchState(state => state.query.mostRecentSearch);
    const searchResults = useSearchState(state => state.vertical.results);

    const emptyResponse = {meta: {errors: [], uuid: ""}, response: {conversationId: "", message: {timestamp: "", text: "", source: ""}, notes: []}};
    const [chatResponse, setChatResponse] = useState<ChatResponse>(emptyResponse);
    
    const [isLoading, setIsLoading] = useState(false);

    useEffect (() => {
        setIsLoading(true);

        fetch('https://liveapi.yext.com/v2/accounts/me/chat/file-search/message?&v=20230101&api_key=269c811bcc591e79578589d3387f8ecf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "messages": [
                    {
                        "source": "BOT",
                        "text": "Whats up! This is Lebron. How can I help you?"
                    },
                    {
                        "source": "USER",
                        "text": mostRecentSearch,
                    }
                ],
                "notes": {
                    "currentGoal": "LEBRON",
                    "currentStepIndices": [0],
                    "searchQuery": mostRecentSearch,
                    "queryResult": searchResults,
                }
            }),
        })
        .then(response => response.json())
        .then(data => {
            setChatResponse(data)
            setIsLoading(false);
        });
    }, [searchResults]);

    if (Object.keys(chatResponse).length === 0) {
        return <div>Nothing yet buddy</div>
    }
    else {
        if (isLoading === true) {
            return <div>Loading...</div>
        }
        else {
            return <div>{chatResponse.response.message.text}</div>
        }
    }
};