// ==UserScript==
// @name         Remove Followed Users on Instagram using CSV file
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Remove followed users on Instagram using a CSV file
// @match        https://www.instagram.com/explore/accounts_you_follow/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Check if the CSV file is attached to the page
    const csvFile = document.querySelector('input[type="file"]');
    if (!csvFile) {
        alert('Please attach the CSV file to the page and reload the script.');
        return;
    }

    // Read the CSV file and parse its contents
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const csvData = event.target.result;
        const rows = csvData.split('\n');
        const followedUsers = [];

        rows.forEach((row) => {
            const columns = row.split(',');
            if (columns.length === 1) {
                followedUsers.push(columns[0].trim());
            }
        });

        // Remove the followed users
        const followingContainer = document.querySelector('[data-testid="accounts-you-follow"]');
        if (followingContainer) {
            followedUsers.forEach((username) => {
                const userElement = followingContainer.querySelector(`[aria-label="View ${username}"]`);
                if (userElement) {
                    userElement.parentNode.removeChild(userElement);
                }
            });
        } else {
            alert('Unable to find the following container on the page.');
        }
    };

    csvFile.addEventListener('change', function(event) {
        fileReader.readAsText(event.target.files[0]);
    });
})();