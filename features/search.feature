Feature: Booking of two tickets

    Scenario: Should successful booking of one ticket
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When chooses tomorrow of the film screening
        When choose a movie showing time tomorrow
        When selects empty one seat in the hall
        Then gets the opportunity to book them

    Scenario: Should successful booking of two tickets
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When choose to show a movie in 3 days
        When select a movie showing time in 3 days
        When selects empty first seat in the hall
        When selects empty second seat in the hall
        When go to the page with information about booked tickets
        When go to the page with QR-code tickets
        Then receive information about the booked ticket and QR-code

    Scenario: Should unsuccessful booking of one ticket
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When choose to show a movie in 3 days
        When select a movie showing time in 3 days
        When selects empty first seat in the hall
        Then the place is occupied