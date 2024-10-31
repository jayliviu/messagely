TRUNCATE users CASCADE;
TRUNCATE messages CASCADE;

COPY users (username, password, first_name, last_name, phone, join_at, last_login_at) FROM stdin;
user1	password1	Alice	Smith	123-456-7890	'2024-10-24 09:00:00'	'2024-10-24 12:00:00'
user2	password2	Bob	Johnson	234-567-8901	'2024-10-23 14:00:00'	'2024-10-24 11:30:00'
user3	password3	Charlie	Brown	345-678-9012	'2024-10-22 08:30:00'	'2024-10-23 16:45:00'
user4	password4	David	Wilson	456-789-0123	'2024-10-21 18:15:00'	'2024-10-24 10:20:00'
user5	password5	Eve	Davis	567-890-1234	'2024-10-20 10:00:00'	'2024-10-24 14:00:00'
user6	password6	Frank	Miller	678-901-2345	'2024-10-19 09:30:00'	'2024-10-23 13:00:00'
user7	password7	Grace	Martinez	789-012-3456	'2024-10-18 11:45:00'	'2024-10-24 09:45:00'
user8	password8	Hank	Garcia	890-123-4567	'2024-10-17 15:00:00'	'2024-10-23 17:30:00'
user9	password9	Ivy	Rodriguez	901-234-5678	'2024-10-16 12:00:00'	'2024-10-24 13:30:00'
user10	password10	Jack	Martinez	012-345-6789	'2024-10-15 08:00:00'	'2024-10-23 15:00:00'
user11	password11	Kathy	Wilson	112-345-6780	'2024-10-14 09:15:00'	'2024-10-24 11:00:00'
user12	password12	Larry	Anderson	122-456-7890	'2024-10-13 16:20:00'	'2024-10-23 12:30:00'
user13	password13	Mia	Thomas	133-567-8901	'2024-10-12 14:10:00'	'2024-10-24 14:45:00'
user14	password14	Nina	Taylor	144-678-9012	'2024-10-11 13:50:00'	'2024-10-23 18:00:00'
user15	password15	Oscar	Moore	155-789-0123	'2024-10-10 11:00:00'	'2024-10-24 10:15:00'
user16	password16	Pam	White	166-890-1234	'2024-10-09 17:30:00'	'2024-10-24 09:00:00'
user17	password17	Quinn	Lee	177-901-2345	'2024-10-08 12:45:00'	'2024-10-23 13:50:00'
user18	password18	Rachel	Clark	188-012-3456	'2024-10-07 10:00:00'	'2024-10-24 15:00:00'
user19	password19	Steve	Hall	199-123-4567	'2024-10-06 09:00:00'	'2024-10-23 14:20:00'
user20	password20	Tina	Young	200-234-5678	'2024-10-05 14:30:00'	'2024-10-24 16:30:00'
user21	password21	Uma	Allen	211-345-6789	'2024-10-04 11:10:00'	'2024-10-23 10:45:00'
user22	password22	Victor	Scott	222-456-7890	'2024-10-03 15:40:00'	'2024-10-24 12:15:00'
user23	password23	Wendy	Adams	233-567-8901	'2024-10-02 13:25:00'	'2024-10-23 11:30:00'
user24	password24	Xavier	Baker	244-678-9012	'2024-10-01 09:50:00'	'2024-10-24 14:10:00'
user25	password25	Yara	Gonzalez	255-789-0123	'2024-09-30 08:30:00'	'2024-10-23 12:00:00'
user26	password26	Zack	Carter	266-890-1234	'2024-09-29 17:45:00'	'2024-10-24 09:30:00'
user27	password27	Anna	Phillips	277-901-2345	'2024-09-28 12:20:00'	'2024-10-23 15:15:00'
user28	password28	Brian	Evans	288-012-3456	'2024-09-27 10:00:00'	'2024-10-24 13:40:00'
user29	password29	Cindy	Turner	299-123-4567	'2024-09-26 11:30:00'	'2024-10-23 14:50:00'
user30	password30	Derek	Collins	300-234-5678	'2024-09-25 09:10:00'	'2024-10-24 10:50:00'
\.


COPY messages (from_username, to_username, body, sent_at, read_at) FROM stdin;
user1	user2	Hey Bob, how are you?	'2024-10-20 09:00:00'	\N
user3	user4	Hello David, long time no see!	'2024-10-19 15:30:00'	'2024-10-19 18:30:00'
user5	user6	Are you coming to the event tomorrow?	'2024-10-18 12:45:00'	\N
user7	user8	Let me know if you need any help.	'2024-10-17 16:00:00'	'2024-10-17 18:00:00'
user9	user10	Please review the document I sent you.	'2024-10-16 14:10:00'	\N
user11	user12	Happy birthday Larry!	'2024-10-15 09:00:00'	'2024-10-15 11:00:00'
user13	user14	Can you meet me at 5pm today?	'2024-10-14 17:00:00'	\N
user15	user16	Thanks for the assistance.	'2024-10-13 13:30:00'	'2024-10-13 16:30:00'
user17	user18	Rachel, did you finish the task?	'2024-10-12 11:00:00'	\N
user19	user20	Steve, call me when you can.	'2024-10-11 15:45:00'	\N
user21	user22	Let's schedule a meeting.	'2024-10-10 10:30:00'	'2024-10-10 13:30:00'
user23	user24	Hope you're having a good day!	'2024-10-09 09:20:00'	\N
user25	user26	Can you send me the details?	'2024-10-08 12:50:00'	'2024-10-08 14:00:00'
user27	user28	Let's catch up soon.	'2024-10-07 18:10:00'	\N
user29	user30	Derek, your order has been shipped.	'2024-10-06 11:40:00'	'2024-10-06 14:20:00'
user2	user1	Hey Alice, I'm doing well. You?	'2024-10-05 10:20:00'	\N
user4	user3	Yeah, it's been a while.	'2024-10-04 16:45:00'	\N
user6	user5	I'll be there, definitely.	'2024-10-03 14:00:00'	\N
user8	user7	Thanks, Grace! I appreciate it.	'2024-10-02 11:00:00'	\N
user10	user9	Sure, I'll take a look.	'2024-10-01 15:00:00'	\N
user12	user11	Thanks, Kathy!	'2024-09-30 09:30:00'	\N
user14	user13	Yes, see you then.	'2024-09-29 13:50:00'	\N
user16	user15	You're welcome!	'2024-09-28 10:20:00'	\N
user18	user17	Almost done, I'll update you shortly.	'2024-09-27 16:10:00'	\N
user20	user19	Will do.	'2024-09-26 14:00:00'	\N
user22	user21	Sounds good, I'll send an invite.	'2024-09-25 11:40:00'	\N
user24	user23	Thanks, Wendy!	'2024-09-24 09:00:00'	\N
user26	user25	Sure thing, I'll send it over.	'2024-09-23 15:00:00'	\N
user28	user27	Definitely, let's plan something.	'2024-09-22 12:30:00'	\N
user30	user29	Great, thanks for the update.	'2024-09-21 10:15:00'	\N
\.
