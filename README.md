NOTES:

For timing reasons:
- some Accessibility implementations are missing, for exmaple the focus trap for dialogs or for the not-native interactive elements such as the custom select element.
- I didn't create a dropdown for the 'Buy / Sell' button. It would have been very similar to the custom select element I created.
- I would have worked on the styling more, like thinking of a better responsive solution or more generally thinking of a more attractive design.

---------

Trying to match the requirements as much as possible, the way I intepreted 'handling the authentication locally' is by simply using hooks and condinal render.

----------

messari.io API doesn't seem to have images, so I created an helper (getAssetLogoUrl) to render the logos of the crypto using a different end point just for images, coingecko.com.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

-----

This project was bootstrapped with [Create React App]