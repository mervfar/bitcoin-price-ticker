// Views

function getTickerView(tickerId) {
  var tickerView = $(".ticker#"+tickerId)
  if (tickerView.size() == 0) {
    tickerView = createTickerView(tickerId)
  }
  return tickerView
}

function createTickerView(tickerId) {
  var tickerView = newViewTicker(tickerId)
  $('#tickers-body').append(tickerView)
  return tickerView
}

function newViewTicker(tickerId) {
  return $( "<div></div>", {
    "id": tickerId,
    "class": DEFAULT_TICKER_CSS_CLASSES,
    "text": 'New emtpy ticker for ' + tickerId
  })
}

// Update and style of ticker div //
function updateStyle(tickerId, color, fontSize, background) {
  $(".ticker#"+tickerId).css('font-size', fontSize)
  $(".ticker#"+tickerId).css('color', color)
  if (background) {
    if (background.match(/-bg$/) == null) {
      background += "-bg" // Append background CSS to name when missing
    }
    $(".ticker#"+tickerId).removeClass().addClass(DEFAULT_TICKER_CSS_CLASSES)
    $(".ticker#"+tickerId).addClass(background)
  } else {
    $(".ticker#"+tickerId).removeClass().addClass(DEFAULT_TICKER_CSS_CLASSES)
  }
}

function updateView(tickerId, price, exchangeName, currency, baseCurrency, currencyPosition, color, fontSize, background) {
  var tickerView = $(".ticker#"+tickerId)
  if (tickerView.size() != 1) {
    return // Ticker was removed
  }
  updateStyle(tickerId, color, fontSize, background)
  var tickerText = price
  switch (currencyPosition) {
    case 'B':
      tickerText = currency + price
      break
    case 'A':
      tickerText =  price + currency
      break
  }
  var label = exchangeName + " " + currency + "/" + baseCurrency
  if (DEBUG) tickerView.text( tickerText + " " + ++counter) // DEBUG TODO remove counter
  tickerView.attr("tooltiptext", label)
  tickerView.attr("title", label)
}