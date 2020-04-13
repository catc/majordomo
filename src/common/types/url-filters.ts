/*
	`WebNavigationEventFilter` and `chrome.events.UrlFilter`
	don't seem to be exported from @chrom/types so declare them
	manually
*/

export type UrlFilter = {
	/** Optional. Matches if the scheme of the URL is equal to any of the schemes specified in the array.  */
	schemes?: string[]
	/**
	 * Optional.
	 * Since Chrome 23.
	 * Matches if the URL (without fragment identifier) matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the RE2 syntax.
	 */
	urlMatches?: string
	/** Optional. Matches if the path segment of the URL contains a specified string.  */
	pathContains?: string
	/** Optional. Matches if the host name of the URL ends with a specified string.  */
	hostSuffix?: string
	/** Optional. Matches if the host name of the URL starts with a specified string.  */
	hostPrefix?: string
	/** Optional. Matches if the host name of the URL contains a specified string. To test whether a host name component has a prefix 'foo', use hostContains: '.foo'. This matches 'www.foobar.com' and 'foo.com', because an implicit dot is added at the beginning of the host name. Similarly, hostContains can be used to match against component suffix ('foo.') and to exactly match against components ('.foo.'). Suffix- and exact-matching for the last components need to be done separately using hostSuffix, because no implicit dot is added at the end of the host name.  */
	hostContains?: string
	/** Optional. Matches if the URL (without fragment identifier) contains a specified string. Port numbers are stripped from the URL if they match the default port number.  */
	urlContains?: string
	/** Optional. Matches if the query segment of the URL ends with a specified string.  */
	querySuffix?: string
	/** Optional. Matches if the URL (without fragment identifier) starts with a specified string. Port numbers are stripped from the URL if they match the default port number.  */
	urlPrefix?: string
	/** Optional. Matches if the host name of the URL is equal to a specified string.  */
	hostEquals?: string
	/** Optional. Matches if the URL (without fragment identifier) is equal to a specified string. Port numbers are stripped from the URL if they match the default port number.  */
	urlEquals?: string
	/** Optional. Matches if the query segment of the URL contains a specified string.  */
	queryContains?: string
	/** Optional. Matches if the path segment of the URL starts with a specified string.  */
	pathPrefix?: string
	/** Optional. Matches if the path segment of the URL is equal to a specified string.  */
	pathEquals?: string
	/** Optional. Matches if the path segment of the URL ends with a specified string.  */
	pathSuffix?: string
	/** Optional. Matches if the query segment of the URL is equal to a specified string.  */
	queryEquals?: string
	/** Optional. Matches if the query segment of the URL starts with a specified string.  */
	queryPrefix?: string
	/** Optional. Matches if the URL (without fragment identifier) ends with a specified string. Port numbers are stripped from the URL if they match the default port number.  */
	urlSuffix?: string
	/** Optional. Matches if the port of the URL is contained in any of the specified port lists. For example [80, 443, [1000, 1200]] matches all requests on port 80, 443 and in the range 1000-1200.  */
	ports?: any[]
	/**
	 * Optional.
	 * Since Chrome 28.
	 * Matches if the URL without query segment and fragment identifier matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the RE2 syntax.
	 */
	originAndPathMatches?: string
}
