using System;

namespace cosmosweb.Helpers
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = false, AllowMultiple = false)]
    sealed class SitemapExcludeAttribute : Attribute
    {
    }
}
