import { baseApi } from './baseApi';
import { Message, Conversation, SendMessageRequest } from '@/types/chat';


const API_URL = `https://supporthub-kpga.onrender.com`;

export const chatApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getConversations: builder.query<Conversation[], string>({
            query: (companyName) => ({
                url: `${API_URL}/${companyName}/Email/get-last-conversations`,
                method: 'GET',
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Conversation' as const, id })),
                        { type: 'Conversations' as const, id: 'LIST' },
                    ]
                    : [{ type: 'Conversations' as const, id: 'LIST' }],
        }),

        getConversationById: builder.query<Conversation, { companyName: string; id: number }>({
            query: ({ companyName, id }) => ({
                url: `${API_URL}/${companyName}/Email/get-conversation-by-id`,
                method: 'GET',
                params: { id },
            }),
            providesTags: (result, error, { id }) => [{ type: 'Conversation' as const, id }],
        }),

        sendMessage: builder.mutation<
            void,
            { companyName: string; data: SendMessageRequest }
        >({
            query: ({ companyName, data }) => ({
                url: `${API_URL}/${companyName}/Email/send-message`,
                method: "POST",
                body: data,
            }),
            // @ts-ignore
            invalidatesTags: (result, error, arg) => [
                "Conversations",
                { type: "Conversation", id: arg.data.emailConversationId },
            ],
        }),
    }),
});

export const {
    useGetConversationsQuery,
    useGetConversationByIdQuery,
    useSendMessageMutation,
} = chatApi;