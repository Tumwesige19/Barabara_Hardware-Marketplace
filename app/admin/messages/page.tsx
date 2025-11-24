import { getMessages } from '@/app/actions';
import { Mail, MailOpen } from 'lucide-react';

export default async function AdminMessagesPage() {
    const messages = await getMessages();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
                <p className="text-muted-foreground">View customer inquiries and complaints.</p>
            </div>

            <div className="grid gap-4">
                {messages.length === 0 ? (
                    <p className="text-muted-foreground">No messages found.</p>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`p-6 rounded-lg border shadow-sm transition-all hover:shadow-md ${msg.status === 'Unread' ? 'bg-card border-primary/20' : 'bg-muted/30'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-full ${msg.status === 'Unread' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                        {msg.status === 'Unread' ? <Mail className="w-5 h-5" /> : <MailOpen className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{msg.subject}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            From: <span className="font-medium text-foreground">{msg.senderName}</span> ({msg.email})
                                        </p>
                                    </div>
                                </div>
                                <div className="text-sm text-muted-foreground whitespace-nowrap">
                                    {msg.date}
                                </div>
                            </div>
                            <div className="pl-14">
                                <p className="text-sm leading-relaxed">{msg.message}</p>
                                <div className="mt-4 flex gap-2">
                                    <button className="text-xs font-medium text-primary hover:underline">
                                        Reply via Email
                                    </button>
                                    <span className="text-muted-foreground text-xs">•</span>
                                    <button className="text-xs font-medium text-muted-foreground hover:text-foreground">
                                        Mark as {msg.status === 'Unread' ? 'Read' : 'Unread'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
