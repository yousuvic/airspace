require_relative 'geocoding'

class Address
  attr_accessor :lat, :lng, :full_address


  def getLocation(full_address)
    @full_address = full_address
    result = Geocoder.search(@full_address).first.data rescue ["Geocoder search failed in: getLocation"]
    if result
      @lat = result['latt'].to_f
      @lng = result['longt'].to_f
      @coordinates = [@lat, @lng]
    end
  end

  def getStreet(coordinates)
    Geocoder.address(coordinates) rescue['Geocoder address failed in: getStreet']
  end

  def geocoded?
    !@lat.nil? && !@lng.nil?
  end

  def reverse_geocoded?
    !@full_address.nil?
  end

  def coordinates
    [lat,lng]
  end

  def miles_to(end_point)
    if self.geocoded?
      Geocoder::Calculations.distance_between(@coordinates, end_point).to_i rescue ["Geocoder distance failed in: miles_to"]
    else
      puts "Address can't be geocoded"
    end
  end

end
