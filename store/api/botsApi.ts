import { baseApi } from './baseApi';

export interface EmailBot {
    id: string;
    email: string;
    smtpHost: string;
    smtpPort: number;
    imapHost: string;
    imapPort: number;
}

interface CreateEmailBotRequest {
    email: string;
    password: string;
    smtpPort: number;
    smtpHost: string;
    imapPort: number;
    imapHost: string;
}

export const emailBotsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getEmailBots: builder.query<EmailBot[], string>({
            query: (companyName) => ({
                url: `https://supporthub-kpga.onrender.com/${companyName}/Email/get-email-bots`,
                method: 'GET',
            }),
        }),

        deleteEmailBot: builder.mutation<void, { companyName: string; id: string }>({
            query: ({ companyName, id }) => ({
                url: `https://supporthub-kpga.onrender.com/${companyName}/Email/delete-email-bot`,
                method: 'DELETE',
                params: { id },
            }),
            async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    emailBotsApi.util.updateQueryData('getEmailBots', '', (draft) => {
                        const index = draft.findIndex((bot) => bot.id === id);
                        if (index !== -1) draft.splice(index, 1);
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),

        createEmailBot: builder.mutation<EmailBot, { companyName: string; botData: CreateEmailBotRequest }>({
            query: ({ companyName, botData }) => ({
                url: `https://supporthub-kpga.onrender.com/${companyName}/Email/create-email-bot`,
                method: 'POST',
                body: botData,
            }),
            async onQueryStarted({ companyName }, { dispatch, queryFulfilled }) {
                try {
                    const { data: newBot } = await queryFulfilled;
                    dispatch(
                        emailBotsApi.util.updateQueryData('getEmailBots', companyName, (draft) => {
                            draft.push(newBot);
                        })
                    );
                } catch {}
            },
        }),
    }),
});

export const {
    useGetEmailBotsQuery,
    useDeleteEmailBotMutation,
    useCreateEmailBotMutation,
} = emailBotsApi;