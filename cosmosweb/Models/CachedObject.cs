using Microsoft.Extensions.Logging;
using System;

namespace cosmosweb.Models
{
	public class CachedObject<T> where T : class
	{
		private readonly TimeSpan normalCacheDuration;
		private readonly TimeSpan retryDuration;

		private T cachedData;
		private long cacheExpirationTicks;  // Using ticks because Interlocked.Exchange doesn't support DateTime datatype

		private readonly object _lock = new object();

		public CachedObject()
		{
		}

		public CachedObject(TimeSpan normalCacheDuration, TimeSpan retryDuration)
		{
			this.normalCacheDuration = normalCacheDuration;
			this.retryDuration = retryDuration;
		}

		public T GetOrCreateValue(Func<T> createFunction)
		{
			// Check if cached data is expired
			var currentTime = DateTime.Now;
			if (cacheExpirationTicks <= currentTime.Ticks || normalCacheDuration == TimeSpan.Zero)
			{
				lock (_lock)
				{
					if (cacheExpirationTicks <= currentTime.Ticks || normalCacheDuration == TimeSpan.Zero)
					{
						// Update the cache expiration right away to avoid multiple threads refreshing the cache
						var newExpirationTime = currentTime.Add(normalCacheDuration);
						long exchangedTicks = System.Threading.Interlocked.Exchange(ref cacheExpirationTicks, newExpirationTime.Ticks);

						// Double check that no other thread beat us to the punch
						if (exchangedTicks <= currentTime.Ticks)
						{
							try
							{
								// Call the delegate to get fresh data
								T newData = createFunction();
								if (newData != null)
								{
									System.Threading.Interlocked.Exchange(ref cachedData, newData);
								}
								else
								{
									// Shorten the expiration time if we failed to refresh the cache, so we can try again
									newExpirationTime = DateTime.Now.Add(retryDuration);
									System.Threading.Interlocked.Exchange(ref cacheExpirationTicks, newExpirationTime.Ticks);
								}
							}
							catch
							{
								// Shorten the expiration time if we failed to refresh the cache, so we can try again
								newExpirationTime = DateTime.Now.Add(retryDuration);
								System.Threading.Interlocked.Exchange(ref cacheExpirationTicks, newExpirationTime.Ticks);

								// TODO: Add some error logging here
							}
						}
					}
				}
			}
			return cachedData;
		}
	}
}