function QuoteHelper() {}

QuoteHelper.prototype.name              = text => `<span class="quote-name">${text}</span>`;
QuoteHelper.prototype.onlyTechnicalSpan = text => `<span>${text}</span>`;
QuoteHelper.prototype.ucfirst = string => string.charAt(0).toUpperCase() + string.slice(1);
