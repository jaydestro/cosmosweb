using System;

namespace cosmosweb.Helpers
{
    /// <summary>
    /// Specifies the <see cref="ISitemapUrlGenerator"/> to use to generate URLs for a given action.
    /// The value generator will be resolved from DI, so should be registered as a service in Startup.cs.
    /// </summary>
    [AttributeUsage(AttributeTargets.Method, Inherited = false, AllowMultiple = false)]
    sealed class SitemapUrlExpanderAttribute : Attribute
    {
        public SitemapUrlExpanderAttribute(Type valueGenerator)
        {
            ValueGenerator = valueGenerator;
        }

        public Type ValueGenerator { get; set; }
    }
}
