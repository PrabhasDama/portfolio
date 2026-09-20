---
title: "Developing CalTrack: how a Nutrition Tracker Evolved into a Full-Stack System"
description: "How CalTrack grew from a nutrition tracker into a connected system for meal planning, groceries, pantry inventory, and budgeting."
date: "2026-09-20"
status: published
tags: ["CalTrack", "Engineering", "Product"]
---

It all made senseI was frustrated that most nutrition calculators didn't do the mental calculations I do every day. That's what led me to create CalTrack.

While most nutrition apps are very accurate at reporting what you've put into your body, maintaining a healthy diet is a little bit more complex. You must choose food options, assess what is already in your cupboards, make your shopping list, live within a set budget, run errands, and then finally keep to your predetermined script.

I wanted the effect of putting all them as a one connected system.

And that was the idea that became CalTrack.

## The Problem I Wanted to Solve

A normal week could be consuming one app for gage calories, a different location to dump food, a note section to collect shopping, a totally different method to record costs.

The individual tools are functional. The workflow between them is not.

CalTrack is my attempt to connect that entire loop:

Imagine it as planShopStockEatTrackAdjust. Everything is stored, the output is kept in stock and food is available to eat. The system has to log everything and each cost in money, time and energy can be measured.

Even though the meal plan is just a static list, CalTrack recognizes that those meals have ingredients. Those ingredients influence what is included on the grocery list. Shopping affects what is in the pantry and the budget. What is in the pantry should influence what should be bought next.

This feeling of interconnectedness became the most interesting engineering challenge during the project.

## Building the Product

I developed CalTrack as a full-stack web app using Next.js React TypeScript Supabase PostgreSQL, and Vercel, with a Resend.

The application begins with an onboarding, where a user can set his goals and preferences. From here, CalTrack integrates multiple systems that would typically stand alone: daily nutrition log, meal plans shopping shop list, pantry storage purchases budget, measurements progress cooking, and analytics.

Another that I'm interested in is the pantry, meal plan, and grocery list.

When the inventory of an ingredient is exhausted or there is not sufficient quantity left over for the next scheduled meal, the system can determine that it must once again be an active grocery item. Once the shopping has been completed and the groceries purchased, they can be re-entered into the pantry inventory, rather than the user having to change many different sections of the application.

That is all clear on the part of the user.

It was the replications that failed to behave reliably underneath.

## The Hard Part Wasn't Adding Features

Since CalTrack has grown, I have discovered that it is generally much easier to implement a feature than to have that feature work seamlessly with all the existing features.

A grocery item is a grocery item.

Could be an ingredient demanded by a number of dishes. Possibly already in the larder. Might be sold in the shop in a packet that doesn't necessarily equal the amount I need. Buying it costs money. Using it takes up shelf space in the larder. Altering next week's meal plan may alter the amount needed to buy entirely.

Which meant I had to think about state, data relationships, units synchronization, edge cases, so much more in depth.

The page began to stop feeling like a pile of pages and started to feel like a system.

## Making Shopping Smarter

And, I've been working on increasing the usability of running a grocery shop over plain drawing.

CalTrack enables budgets and store-aware shopping workflows (includes "split shopping"). I also have been getting real store and price data so it can make informed decisions about which store a shopping list should be purchased from.

That we encountered yet another kind of problem: mapping external product data to CalTrack's internal representation of ingredients.

A user thinks with:

Chicken breast

A retailer might take that very same idea and have dozens of items, with different brands and package sizes, naming conventions, units, and prices.

The trick to work in those two worlds is a normalization and a product matching not providing what the API gives.

This has been such an interesting development in how the project has progressed.

## Building for Failure, Not Just the Demo

As the size of the application grew, testing became a lot more critical.

CalTrack has a pretty huge automated test suite on application behavior, browser cases, and security cases. I also run type checking, linting, and production builds in validating releases.

This has altered my perspectives of development and as a result has altered the way I approach development.

Earlier in the project, I would often think:

Does the new feature work?

Now the more important question is:

Does it work or do I end up breaking the rest?

That difference becomes more critical as a codebase is developed.

A pantry change can influence groceries. A grocery change can influence purchases. A purchase can influence the budget. A meal-plan change can influence all three.

Testing has given me more confidence to continue to develop those relationships.

## What I Learned

CalTrack should have been the biggest single source of practical programming experience I've gained.

What I learned was nothing we covered was the single biggest lesson; it wasn't a setup, it wasn't an API.

It was learning to think in systems rather than features.

Even if a feature functions flawlessly on its own, it may result in an unsatisfactory product if it doesn't integrate appropriately with its surroundings. Effective software architecture is not just about organizing code but also about defining how smoothly the product can grow when the initial concept scales far beyond its original scope.

It has also opened my eyes to the impact that small product decisions can have on engineering.

Do you want the egg in grams or in quantities? What if someone purchases more than what the planning deserves? When do you want to fade an item in your shopping list? What if the cupboard has only a part of what you need? How to compare two stores when their packages are not the same size?

None of those questions seem all that complicated until you realize you need to figure out precisely how the software should behave.

## Where CalTrack Is Now

Started as a tracking app, but developed into a much broader coaching/guide platform around nutrition, meal planning, pantry inventory, grocery shopping budgeting, shopping purchasing progress, tracking/monitoring/reporting and analytics.

The project is now at the stage where the core system is up and running but I don't see that as the end of the project.

There are various paths I would still like to pursue; I mainly would like to work more on actual prices, smarter product matching, rapid engagement, scanning flows, and making the planning to shopping relationship more autonomous.

This also underlies my enthusiasm for the CalTrack project.

I didn't begin with a fully defined final product. I begin with one interesting problem I feel connected to, constructed a solution to it, found other new issues within that solution, and pushed forward again.

That has been the most valuable thing for me.
