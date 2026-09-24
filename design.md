Rheva Developer Platform — Design System & Product Specification
1. Product Identity
Product Name: Rheva Developer Platform
Personal Brand: Rheva Iqbal Abdillah
Primary Positioning:
Software Engineer who builds practical digital products and systems.
The website is a combination of:


Personal Developer Portfolio

Project Showcase

Digital Product / App Store

Technical Blog

Private CMS

Business Management Dashboard
The product must feel like a real software product, not a resume template.
2. Product Philosophy
The core philosophy is:
Don't just show that I can code. Show what I can build.
The website should communicate three levels of capability:
Level 1 — Personal Brand
Who is Rheva?
Level 2 — Engineering Capability
What systems has Rheva built?
Level 3 — Product Capability
What software products can Rheva offer to users or organizations?
The public website must therefore prioritize:


Credibility

Technical competence

Product thinking

Practical problem solving

Clean visual communication
3. Technology Context
The interface will be implemented using:


Next.js

TypeScript

React

Tailwind CSS

shadcn/ui

Firebase

Firebase Authentication

Firestore

Firebase Storage

Vercel
The design must be realistic to implement using these technologies.
Do not introduce unnecessary technologies.
4. Brand Personality
The visual identity should feel:


Intelligent

Professional

Technical

Calm

Modern

Precise

Independent

Product-oriented
Avoid visual styles that feel:


childish

overly playful

cyberpunk

gaming-oriented

cryptocurrency-oriented

excessively futuristic

template-like

corporate-cliché
The website should look appropriate for both:


software clients

educational institutions

government / organizational environments
while still maintaining a strong developer identity.
5. Visual Direction
Overall Style
Use a premium editorial SaaS aesthetic.
Combine:


editorial typography

modern SaaS layouts

technical UI details

generous whitespace

structured grids

subtle borders

restrained shadows

strong typography
The design should have visual confidence without being visually noisy.
6. Color System
Primary visual foundation:
Light Theme
Background       #F8F9FA
Surface          #FFFFFF
Primary Text     #111111
Secondary Text   #6B7280
Border           #E5E7EB
Accent           #2563EB

Dark Theme
Background       #0A0A0A
Surface          #111111
Primary Text     #F5F5F5
Secondary Text   #A1A1AA
Border           #27272A
Accent           #3B82F6

Blue is the primary accent.
Do NOT turn every component blue.
Blue should be used primarily for:


CTA

active states

links

selected navigation

status indicators

important technical highlights
7. Typography
Use a modern sans-serif font for general UI.
Recommended:


Inter

Geist

Manrope
Use monospace typography for technical metadata:


technology tags

code

version numbers

technical labels

system status

URLs
Typography hierarchy:
Display
64–80px

H1
48–64px

H2
36–48px

H3
24–32px

Body
16–18px

Small
13–14px

Technical
12–14px

Typography should feel intentional.
Do not use giant typography everywhere.
8. Spacing System
Use a consistent spacing scale based on multiples of 4.
Primary spacing:
4
8
12
16
24
32
48
64
80
96
128

Desktop sections should generally have:
Section padding:
96px – 128px

Mobile:
Section padding:
64px – 80px

Avoid cramped layouts.
9. Border Radius
Use moderate radius.
Preferred:
Small controls: 6px
Buttons: 8px
Cards: 12px
Large containers: 16px

Avoid excessive rounded-pill UI.
Pills should only be used for:


tags

status

categories

technology labels
10. Shadows
Use shadows sparingly.
Preferred visual hierarchy:


Border

Background contrast

Very subtle shadow
Do not make every card float.
11. Layout Grid
Desktop:
Max width: 1280px
Grid: 12 columns
Gap: 24px

Tablet:
8 columns

Mobile:
4 columns

Content should have strong alignment.
12. Navigation
Desktop navigation:
RHEVA                     Home Projects Apps Services Articles
                                                     Let's Talk

Logo / wordmark:
RHEVA
Navigation should remain minimal.
Use sticky navigation with subtle background treatment.
Do not create oversized navigation bars.
13. Homepage Architecture
Homepage structure:
Navigation

Hero

Trust / Technology Strip

Selected Projects

Apps & Digital Products

About

Experience

Services

Articles

CTA

Footer

14. Hero
Hero headline:
I build digital products that solve real problems.
Supporting copy:
Software engineer focused on building practical digital solutions across education, administration, data, and modern web applications.
Primary CTA:
View My Work
Secondary CTA:
Explore My Apps
Status:
Available for selected projects
Hero visual should represent a real technical system.
Possible visual:
Next.js
     ↓
Application
     ↓
Firebase
     ↓
Firestore
     ↓
Vercel

Do not use generic laptop illustrations.
15. Selected Projects
Heading:
Selected Work
Supporting text:
Some of the digital systems and products I've designed and built.
Featured projects:
SIMPEG
Modern employee management system.
Technology:
Next.js
Firebase
Vercel

Presensi PPPK
Attendance and verification platform.
Technology:
Next.js
PHP
Firebase

E-Kinsal
Digital administrative platform.
Piket Guru
Teacher duty management system.
Project cards should contain:


project name

category

description

technology

visual preview

project status

CTA
Use large cards.
16. Project Detail Page
Structure:
Breadcrumb

Project Title

Project Summary

Hero Screenshot

Overview

Problem

Solution

Features

Architecture

Technology Stack

Screenshots

Challenges

Results

Related Projects

CTA

The case study should feel like technical documentation combined with product presentation.
17. Apps / Digital Products
Route:
/apps

This page represents the personal software product catalog.
Heading:
Apps & Digital Products
Supporting text:
Software products and tools built to solve specific operational problems.
Product cards should show:


Product name

Category

Description

Features

Technology

Availability

Pricing model

CTA
Product states:
Available
Coming Soon
Private
Archived

18. Product Detail
Example:
SIMPEG
Employee Management Platform
Sections:
Product Hero

Overview

Key Features

Screenshots

Who It's For

Technology

Deployment Model

Pricing

FAQ

Request License

Pricing models:
Free
One-time License
Custom Pricing

Initial implementation may use a manual purchase request.
Do not force payment gateway implementation into the first version.
19. Services
Heading:
What I Can Build
Services:
Web Applications
Modern web applications using Next.js and Firebase.
Internal Management Systems
Digital systems for organizations and institutions.
UI/UX Design
Interface and product design using Figma.
Data & Automation
Dashboards, data processing and workflow automation.
Cards should remain concise.
20. About
Heading:
Behind the code.
The About section should communicate:
Rheva combines software engineering, UI/UX design and data analysis with practical understanding of organizational workflows.
Focus on:


Software Engineering

Fullstack Development

UI/UX

Data

Digital Administration

System Design
Do not make the About section read like a formal government CV.
21. Experience
Use a clean timeline.
Each item:
Period
Organization
Role
Description
Technologies / Responsibilities

Use visual hierarchy rather than excessive decoration.
22. Articles
Route:
/articles

Editorial layout.
Each article:
Title
Excerpt
Category
Date
Reading Time
Thumbnail

Topics may include:


Next.js

Firebase

UI/UX

Digital administration

Education technology

Software engineering

Data management

Building internal systems
23. Contact
Heading:
Have a problem worth solving?
Supporting text:
Let's turn the idea into a working digital product.
Primary CTA:
Start a Conversation
Secondary:
View My Apps
Contact page should remain simple.
24. Admin Application
Route:
/admin

The admin application is private.
It should look like a professional SaaS dashboard.
It must NOT look identical to the public website.
25. Admin Navigation
Sidebar:
Dashboard

Content
├── Projects
├── Apps
├── Articles
├── Experience
└── Services

Business
├── Orders
└── Customers

Media

Settings

26. Admin Dashboard
Overview cards:
Projects
Published Apps
Articles
Orders

Dashboard sections:
Recent Projects
Recently updated projects.
Recent Orders
Product
Customer
Status
Date

Content Activity
Recently published or edited content.
Analytics
Possible metrics:
Visitors
Project Views
App Views
Article Views

27. CMS CRUD
Every content module should support:
Create
Read
Update
Delete
Search
Filter
Draft
Publish
Archive

Project fields:
Title
Slug
Description
Category
Technologies
Thumbnail
Gallery
Demo URL
Repository URL
Featured
Status
Created At
Updated At

App fields:
Name
Slug
Description
Short Description
Category
Features
Technologies
Screenshots
Demo URL
Pricing
License Type
Status
Featured

Article fields:
Title
Slug
Excerpt
Content
Cover Image
Category
Tags
Author
Published Date
Reading Time
Status

28. Authentication
Admin authentication should use:
Firebase Authentication

Preferred:
Google Sign-In

Only authorized admin accounts may access the dashboard.
The interface should never expose admin functionality publicly.
29. Responsive Behavior
The public website must support:


Desktop

Tablet

Mobile
Admin must support:


Desktop

Tablet

Mobile
Mobile admin:
Sidebar → Drawer

Tables should transform into cards or horizontally scroll where necessary.
Never allow content to overflow the viewport.
30. Accessibility
The design must support:


semantic HTML

keyboard navigation

visible focus states

readable contrast

accessible form labels

appropriate button states

alt text for meaningful images
Do not sacrifice accessibility for aesthetics.
31. Component Design
Reusable components:
Button
Card
Badge
Tag
Input
Textarea
Select
Dialog
Dropdown
Tabs
Table
Toast
Tooltip
Breadcrumb
Pagination
Navigation
Sidebar
Modal
Status Indicator

Components must have consistent variants.
32. UI States
Every interactive component should account for:
Default
Hover
Focus
Active
Disabled
Loading
Success
Error
Empty

Do not design only the happy path.
33. Content Philosophy
Content should be concise.
Avoid:


fake corporate copy

exaggerated claims

meaningless buzzwords

"passionate developer" clichés

unnecessary paragraphs
Prefer:


specific

factual

technical

outcome-oriented language
34. Final Design Principle
The entire product should communicate:
Rheva doesn't just write code. Rheva builds systems.
The visual design must support this positioning from the first screen to the admin dashboard.