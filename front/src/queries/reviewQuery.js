import {
  useQuery,
  useInfiniteQuery,
  useQueryClient,
  useMutation,
} from "react-query";
import http from "libs/apiController";

export const useGetRatingInfo = (postId) => {
  return useQuery(["rating", postId], async () => {
    const res = await http.get(`review/${postId}/info`);
    return { rating: res.data };
  });
};

export const useGetReviewList = (postId) => {
  const fetchReviewList = async ({ pageParam = 1 }) => {
    const res = await http.get(
      `review/${postId}/list?page=${pageParam}&limit=6`,
    );
    const { reviews, totalPage } = res.data;
    return { reviews, totalPage, pageParam, nextPage: pageParam + 1 };
  };

  return useInfiniteQuery(["reviews", postId], fetchReviewList, {
    staleTime: 50000,
    cacheTime: 120000,
    getNextPageParam: (lastPage) =>
      lastPage.totalPage === lastPage.pageParam ? undefined : lastPage.nextPage,
  });
};

export const usePostReview = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (review) => {
      await http.post("review", review);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("reviews");
        queryClient.invalidateQueries("rating");
      },
    },
  );
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation((reviewId) => http.delete(`review/${reviewId}`), {
    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
      queryClient.invalidateQueries("rating");
    },
    onError: (err) => console.log(err),
  });
};

export const useUpdateReview = (id) => {
  const queryClient = useQueryClient();
  return useMutation(async (review) => await http.put(`review/${id}`, review), {
    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
      queryClient.invalidateQueries("rating");
    },
    onError: (err) => console.log(err),
  });
};
