import React, { useState, useEffect, useRef } from 'react';


type FetchFunction = (...args: any[]) => Promise<any>

interface FetchParams {
    limit: number;
    skip: number;
    sort?: "asc" | "desc";
    divRef?: React.RefObject<HTMLDivElement | null>;
}

export type PaginationReturnParams = {
    data: any[],
    setData: React.Dispatch<React.SetStateAction<any[]>>,
    loading: boolean,
    fetchData: () => Promise<any>,
    skipRef: React.RefObject<number>,
    limitReached: boolean,
    resetData: () => void

}

export const usePaginationFetch = <TData, T extends FetchFunction>(fetchParams: FetchParams, fetchFunction: T, dataVal: string, args: (skip: number, limit: number) => Parameters<T>): PaginationReturnParams => {
    const [data, setData] = useState<TData[]>([]);
    const skipRef = useRef<number>(fetchParams.skip);
    const [limitReached, setLimitReached] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);
    const loadingRef = useRef<boolean>(false);

    const fetchData = async () => {
        if (loadingRef.current) return;
        setLoading(true);
        loadingRef.current = true;
        try {
            const response = await fetchFunction(...args(skipRef.current, fetchParams.limit));
            setData(prev => [...prev, ...response[dataVal]]);
            skipRef.current = response.nextSkip || 0;
            setLimitReached(response.limitReached);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            loadingRef.current = false;
        }
    }

    const resetData = async () => {

        setData([]);
        setLimitReached(false);
        skipRef.current = fetchParams.skip;
        setLoading(false);
        loadingRef.current = false;
        await fetchData();
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const target = fetchParams.divRef?.current;

        if (!target || limitReached) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !loadingRef.current) {
                    fetchData();
                }
            },
            {
                threshold: 0.1,
            }
        );

        observer.observe(target);

        return () => observer.disconnect();
    }, [limitReached, data.length]);

    return { data, setData, loading, fetchData, skipRef, limitReached: limitReached, resetData };

}