declare namespace Purchases {

    export function isUTCDateStringFuture(dateString: string): void;
    
    /**
    * Sets up Purchases with your API key and an app user id.
    * @param {string} apiKey RevenueCat API Key. Needs to be a string
    * @param {string?} appUserID An optional unique id for identifying the user. Needs to be a string.
    * @param {boolean?} observerMode An optional boolean. Set this to TRUE if you have your own IAP implementation and want to use only RevenueCat's backend. Default is FALSE.
    * @returns {Promise<void>} Returns when setup completes
    */
    export function setup(apiKey: string, appUserID?: string, observerMode?: boolean): Promise<void>;

    /**
     * Set this to true if you are passing in an appUserID but it is anonymous, this is true by default if you didn't pass an appUserID
     * If a user tries to purchase a product that is active on the current app store account, we will treat it as a restore and alias
     * the new ID with the previous id.
     */
    export function setAllowSharingStoreAccount(allowSharing: boolean): void;

    /**
    * Set finishTransactions to false if you aren't using Purchases SDK to make the purchase
    */
    export function setFinishTransactions(finishTransactions: boolean): void;

    /**
    * Sets a function to be called on updated purchaser info
    * @param {PurchaserInfoUpdateListener} purchaserInfoUpdateListener PurchaserInfo update listener
    */
    export function addPurchaserInfoUpdateListener(purchaserInfoUpdateListener: any): void;

    /**
     * Removes a given PurchaserInfoUpdateListener
     * @param {PurchaserInfoListener} listenerToRemove PurchaserInfoListener reference of the listener to remove
     * @returns {boolean} True if listener was removed, false otherwise
     */
    export function removePurchaserInfoUpdateListener(listenerToRemove: any): void;

    /**
     * Enum for attribution networks
     * @readonly
     * @enum {number}
     */
    export enum ATTRIBUTION_NETWORKS {
        APPLE_SEARCH_ADS,
        ADJUST,
        APPSFLYER,
        BRANCH,
        TENJIN,
        FACEBOOK
    }

    /**
     * Add a dict of attribution information
     * @param {Dict} data Attribution data from AppsFlyer, Adjust, or Branch
     * @param {ATTRIBUTION_NETWORKS} network Which network, see Purchases.ATTRIBUTION_NETWORKS
     * @param {string?} networkUserId An optional unique id for identifying the user. Needs to be a string.
     */
    export function addAttributionData(data: any, network: ATTRIBUTION_NETWORKS, networkUserId?: string): void;

    /**
     * Gets the map of entitlements -> offerings -> products
     * @returns {Promise<Map<String, Map<String, Product>>>} Promise of entitlements structure
     */
    export function getEntitlements(): Promise<Map<string, Map<string, any>>>;

    /**
    * Fetch the product info
    * @param {[string]} productIdentifiers Array of product identifiers
    * @param {string?} type Optional type of products to fetch, can be inapp or subs. "subs" by default
    * @returns {Promise<Array>} A promise containing an array of products. The promise will be rejected if the products are not properly
    * configured in RevenueCat or if there is another error retrieving them. Rejections return an error code, and a userInfo object with more information.
    */
    export function getProducts(productIdentifiers: string[], type?: string): Promise<Array<any>>;

    /**
    * Make a purchase
    * @param {string} productIdentifier The product identifier of the product you want to purchase
    * @param {string?} oldSKU Optional sku you wish to upgrade from.
    * @param {string?} type Optional type of product, can be inapp or subs. "subs" by default
    * @returns {Promise<any>} A promise of an object containing a purchaser info object and a product identifier. Rejections return an error code,
    * and a userInfo object with more information and a boolean indicating if the user cancelled the purchase.
    */
    export function makePurchase(productIdentifier: string, oldSKU?: string, typestring?: string): Promise<any>;

    /**
    * Restores a user's previous purchases and links their appUserIDs to any user's also using those purchases.
    * @returns {Promise<any>} A promise of a purchaser info object. Rejections return an error code, and a userInfo object with more information.
    */
    export function restoreTransactions(): Promise<any>;

    /**
     * Get the appUserID
     * @returns {Promise<string>} The app user id in a promise
     */
    export function getAppUserID(): Promise<string>;

    /**
     * This function will alias two appUserIDs together.
     * @param {string} newAppUserID The new appUserID that should be linked to the currently identified appUserID. Needs to be a string.
     * @returns {Promise<any>} A promise of a purchaser info object. Rejections return an error code, and a userInfo object with more information.
     */
    export function createAlias(newAppUserID: string): Promise<any>;

    /**
     * This function will identify the current user with an appUserID. Typically this would be used after a logout to identify a new user without calling configure
     * @param {string} newAppUserID The appUserID that should be linked to the currently user
     * @returns {Promise<any>} A promise of a purchaser info object. Rejections return an error code, and a userInfo object with more information.
     */
    export function identify(newAppUserID: string): Promise<any>;

    /**
     * Resets the Purchases client clearing the saved appUserID. This will generate a random user id and save it in the cache.
     * @returns {Promise<any>} A promise of a purchaser info object. Rejections return an error code, and a userInfo object with more information.
     */
    export function reset(): Promise<any>;

    /**
     * Enables/Disables debugs logs
     * @param {boolean} enabled Enable or not debug logs
     */
    export function setDebugLogsEnabled(enabled: boolean): void;

    /**
     * Gets current purchaser info
     * @return {Promise<any>} A promise of a purchaser info object. Rejections return an error code, and a userInfo object with more information.
     */
    export function getPurchaserInfo(): Promise<any>;

    /**
     * This method will send all the purchases to the RevenueCat backend. Call this when using your own implementation
     * for subscriptions anytime a sync is needed, like after a successful purchase.
     *
     * @warning This function should only be called if you're not calling makePurchase.
     */
    export function syncPurchases(): void;

    /**
     * Enable automatic collection of Apple Search Ad attribution. Disabled by default
     * @param {boolean} enabled Enable or not automatic apple search ads attribution collection
     */
    export function setAutomaticAppleSearchAdsAttributionCollection(enabled: boolean): void;
}

export = Purchases;
