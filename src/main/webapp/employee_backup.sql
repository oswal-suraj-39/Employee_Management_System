--
-- PostgreSQL database dump
--

\restrict n15aAftNRth3fREkbPZcrWHKdmtxG1Grz1KN9Z843gCnZbLUqDhe87UjVKb4cm9

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: contact; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contact (
    c_id integer NOT NULL,
    e_id integer NOT NULL,
    email character varying(100) NOT NULL,
    address text NOT NULL,
    city character varying(50) NOT NULL,
    state character varying(50) NOT NULL,
    country character varying(50) NOT NULL,
    pincode bigint NOT NULL,
    phone bigint NOT NULL
);


ALTER TABLE public.contact OWNER TO postgres;

--
-- Name: contact_c_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contact_c_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contact_c_id_seq OWNER TO postgres;

--
-- Name: contact_c_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contact_c_id_seq OWNED BY public.contact.c_id;


--
-- Name: department; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.department (
    d_id integer CONSTRAINT departments_d_id_not_null NOT NULL,
    e_id integer CONSTRAINT departments_e_id_not_null NOT NULL,
    dept_name character varying(100) CONSTRAINT departments_dept_name_not_null NOT NULL,
    job_title character varying(100) CONSTRAINT departments_job_title_not_null NOT NULL,
    employee_type character varying(30) CONSTRAINT departments_employee_type_not_null NOT NULL,
    join_date date CONSTRAINT departments_join_date_not_null NOT NULL,
    employee_status character varying(30) CONSTRAINT departments_employee_status_not_null NOT NULL
);


ALTER TABLE public.department OWNER TO postgres;

--
-- Name: department_d_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.department_d_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.department_d_id_seq OWNER TO postgres;

--
-- Name: department_d_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.department_d_id_seq OWNED BY public.department.d_id;


--
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    e_id integer NOT NULL,
    employee_id character varying(20) NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    gender character varying(10) NOT NULL,
    dob date NOT NULL,
    salary numeric(10,2) NOT NULL,
    photo_path character varying(255)
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- Name: employees_e_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employees_e_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employees_e_id_seq OWNER TO postgres;

--
-- Name: employees_e_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.employees_e_id_seq OWNED BY public.employees.e_id;


--
-- Name: contact c_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact ALTER COLUMN c_id SET DEFAULT nextval('public.contact_c_id_seq'::regclass);


--
-- Name: department d_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department ALTER COLUMN d_id SET DEFAULT nextval('public.department_d_id_seq'::regclass);


--
-- Name: employees e_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees ALTER COLUMN e_id SET DEFAULT nextval('public.employees_e_id_seq'::regclass);


--
-- Data for Name: contact; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contact (c_id, e_id, email, address, city, state, country, pincode, phone) FROM stdin;
1	1	suraj.oswal@example.com	bibwewadi	pune	maharashtra	india	411037	9012345678
2	2	aarav.sharma@example.com	12, green park, baner	pune	maharashtra	india	411045	9000001001
3	3	rohan.patil@example.com	flat 4b, sai residency, wakad	pune	maharashtra	india	411057	9000001002
4	4	aditya.deshmukh@example.com	22, lotus avenue, kothrud	pune	maharashtra	india	411038	9000001003
5	5	vikram.joshi@example.com	8, river view, hadapsar	pune	maharashtra	india	411028	9000001004
6	6	kunal.kulkarni@example.com	31, silver oak, aundh	pune	maharashtra	india	411007	9000001005
7	7	neha.desai@example.com	15, maple homes, viman nagar	pune	maharashtra 	india	411014	9000001006
8	8	priya.more@example.com	6, hill crest, pimple saudagar	pune	maharashtra	india	411027	9000001007
9	9	sneha.jadhav@example.com	19, shree plaza, kondhwa	pune	maharashtra	india	411048	9000001008
10	10	ananya.shinde@example.com	42, orchid towers, kharadi	pune	maharashtra	india	411014	9000001009
11	11	manav.chavan@example.com	3, sunrise society, katraj	pune	maharashtra	india	411046	9000001010
\.


--
-- Data for Name: department; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.department (d_id, e_id, dept_name, job_title, employee_type, join_date, employee_status) FROM stdin;
1	1	engineering	frontend developer	full time	2020-11-02	on leave
2	2	engineering	software developer	full time	2023-07-10	active
3	3	quality assurance	qa engineer	full time	2022-09-05	active
4	4	engineering	senior software engineer	full time	2021-04-19	active
5	5	it support	it support engineer	full time	2024-01-15	active
6	6	devops	devops engineer	full time	2020-11-02	active
7	7	engineering	frontend developer	full time	2023-03-13	on leave
8	8	data analytics	data analyst	full time	2022-06-20	active
9	9	quality assurance	software test engineer	full time	2024-07-01	active
10	10	product	product manager	full time	2021-08-16	active
11	11	human resources	hr executive	contract	2023-12-04	active
\.


--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employees (e_id, employee_id, first_name, last_name, gender, dob, salary, photo_path) FROM stdin;
1	emp001	suraj	oswal	male	2004-02-21	20000.00	./upload/Picsart_26-06-24_11-34-07-153.jpg
2	emp002	aarav	sharma	male	1998-04-12	54000.00	./upload/Copilot_20261011_201604.png
3	emp003	rohan	patil	male	1998-11-23	65000.00	./upload/ChatGPT Image Oct 11, 2026, 10_51_42 PM.png
4	emp004	aditya	deshmukh	male	1996-02-08	77000.00	./upload/ChatGPT Image Oct 12, 2026, 10_51_11 PM.png
5	emp005	vikram	joshi	male	1999-07-30	45000.00	./upload/ChatGPT Image Oct 15, 2026, 06_21_38 PM.png
6	emp006	kunal	kulkarni	male	1995-09-17	92000.00	./upload/ChatGPT Image Oct 15, 2026, 06_31_45 PM.png
7	emp007	neha	desai	female	1998-06-21	60000.00	./upload/ChatGPT Image Oct 21, 2026, 09_55_13 PM.png
8	emp008	priya	more	female	1997-01-14	70800.00	./upload/ChatGPT Image Oct 21, 2026, 10_02_59 PM.png
9	emp009	sneha	jadhav	female	2000-03-05	40000.00	./upload/ChatGPT Image Oct 21, 2026, 10_25_28 PM.png
10	emp0010	ananya	shinde	female	1996-12-09	81600.00	./upload/ChatGPT Image Oct 21, 2026, 10_33_46 PM.png
11	emp011	manav	chavan	male	1999-10-26	50800.00	./upload/ChatGPT Image Oct 21, 2026, 10_45_19 PM.png
\.


--
-- Name: contact_c_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contact_c_id_seq', 11, true);


--
-- Name: department_d_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.department_d_id_seq', 11, true);


--
-- Name: employees_e_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.employees_e_id_seq', 11, true);


--
-- Name: contact contact_e_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact
    ADD CONSTRAINT contact_e_id_key UNIQUE (e_id);


--
-- Name: contact contact_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact
    ADD CONSTRAINT contact_pkey PRIMARY KEY (c_id);


--
-- Name: department department_e_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_e_id_key UNIQUE (e_id);


--
-- Name: department department_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_pkey PRIMARY KEY (d_id);


--
-- Name: employees employees_employee_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_employee_id_key UNIQUE (employee_id);


--
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (e_id);


--
-- Name: contact fk_contact_employee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact
    ADD CONSTRAINT fk_contact_employee FOREIGN KEY (e_id) REFERENCES public.employees(e_id) ON DELETE CASCADE;


--
-- Name: department fk_department_employee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT fk_department_employee FOREIGN KEY (e_id) REFERENCES public.employees(e_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict n15aAftNRth3fREkbPZcrWHKdmtxG1Grz1KN9Z843gCnZbLUqDhe87UjVKb4cm9

