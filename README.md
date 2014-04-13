# Skynet

Skynet is a self-aware artificial intelligence computer system whose operations are almost exclusively performed by cyborgs, in service of its goal of exterminating humanity.

Skynet is also a crowdsourcing platform whose operations are almost exclusively performed by smartphone-toting humans, in service of its goal of furthering our understanding of air quality, aerosol loading, and our measurement of said.

# The Concept

We are attempting to address the [My Sky Color](https://2014.spaceappschallenge.org/challenge/my-sky-color/) #spaceapps challenge.

Sky color is an indicator of air quality; specifically, it provides a qualitative indication of aerosol loading in the atmosphere.

A bright and clear blue sky means the air is clean; a white and milky sky means the air is not so clean.

The intent of this challenge is to combine the qualitative "the sky looks blue today" with the quantitative "how blue is it exactly". We record the time and location of the photo, for future analysis. We allow the user to select which known shade of blue the sky most closely matches, both so that they feel like they are "doing science", and so we have a cleaner dataset.

We are not currently comparing these results to Aeronet's measurements, but that is a clear direction for the future.

# The App

The Skynet app is responsible for taking photos, analyzing the dominant colors in the color palette, choosing which of them are "closest" to our known shades of blue, and prompting the user to select one and submit the photo.

It is a mobile web app, written in HTML5, which is compatible with iOS and Android. (It can be installed to the home screen of both platforms, and act as if it is a real native app. Except slower, especially for the CPU-intensive photo analysis.)

# The Platform

The platform itself is currently extremely basic.

It is a Ruby on Rails app, whose database has a single table to track submissions (the photo, the selected blue factor, the location, and the time of submission).

It serves primarily to serve the app, and to record the global submissions.

# The Future

- Authenticate users (via either Google or Facebook) so they can keep track of the photos they have submitted
- Show users photos that have been submitted near their current location
- Show the aggregate air quality over time for a location radius
- Allow users to "vote" for good submissions (ie, it appears to actually be a picture of the sky, and the selected blue factor is correct)
- Send top-voted submissions to Aeronet (socially validated submissions are less likely to be trash)

# Contributors

- Design and taste: [Allie Young](https://github.com/alliewas)
- Engineering: [Sean Schulte](https://github.com/sirsean)
