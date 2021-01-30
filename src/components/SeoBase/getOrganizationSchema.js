const getOpeningHours = (openingHours, dows) => {
  const parseDow = (s) => {
    if (!s) {
      return '';
    }
    const dow = s.split('-');
    if (dow.length === 1) {
      return dows[s];
    }
    return `${dows[dow[0]]}-${dows[dow[1]]}`;
  };
  const a = openingHours.reduce(
    (acc, [dow, timeStart, timeFinish]) =>
      `${acc}${acc ? ', ' : ''}${parseDow(dow)}: ${timeStart}-${timeFinish}`,
    '',
  );
  return a.length === 1 ? a[0] : a;
};

const getOrganizationSchema = ({
  organization,
  address = {},
  siteMeta,
  config,
  dows,
  homeURL,
  socialLinks,
}) => {
  const {
    geo,
    openingHours,
    hasMap,
    priceRange,
    currenciesAccepted,
    paymentAccepted,
  } = organization;
  const { legalName, postalAddress, contactPoint } = address;
  const { siteTitle, siteTitleAlt, siteDescription } = siteMeta;

  const schema = {
    '@context': 'http://schema.org',
    '@type': 'Organization',
    name: siteTitle,
    alternateName: siteTitleAlt,
    description: siteDescription,
    url: homeURL,
    logo: config.siteLogo,
  };
  if (config.siteBusinessPhoto) {
    schema.image = Array.isArray(config.siteBusinessPhoto)
      ? [...config.siteBusinessPhoto]
      : config.siteBusinessPhoto;
  }

  if (legalName) {
    schema.legalName = legalName;
  }
  if (postalAddress) {
    const { streetAddress, addressLocality, postalCode, addressCountry } = postalAddress;
    schema.address = {
      '@type': 'PostalAddress',
      addressCountry,
      addressLocality,
      postalCode,
      streetAddress: streetAddress && streetAddress.join(', '),
    };
  }

  if (contactPoint) {
    schema.contactPoint = contactPoint.map(({ name, contactType, telephone, email }) => {
      const o = {
        '@type': 'ContactPoint',
        name,
        contactType,
      };
      if (telephone) {
        o.telephone = telephone.join();
      }
      if (email) {
        o.email = email.join();
      }
      return o;
    });
  } else {
    if (organization.email) {
      schema.email = organization.email.join();
    }
    if (organization.phone) {
      schema.telephone = organization.phone.join();
    }
  }

  if (socialLinks) {
    schema.sameAs = Object.keys(socialLinks).map((key) => socialLinks[key].to);
  }

  if (currenciesAccepted) {
    schema.currenciesAccepted = currenciesAccepted;
  }
  if (paymentAccepted) {
    schema.paymentAccepted = paymentAccepted;
  }
  if (priceRange) {
    schema.priceRange = priceRange;
  }

  if (Array.isArray(openingHours) && dows) {
    schema.openingHours = getOpeningHours(openingHours, dows);
  }

  if (geo) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      ...geo,
    };
  }
  if (hasMap) {
    schema.hasMap = hasMap;
  }

  return schema;
};

export default getOrganizationSchema;
