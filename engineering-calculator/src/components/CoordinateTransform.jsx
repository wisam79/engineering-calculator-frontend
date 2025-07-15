import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'

const CoordinateTransform = () => {
  const [transformType, setTransformType] = useState('utm-to-geo')
  const [utmData, setUtmData] = useState({ easting: '', northing: '', zone: '36' })
  const [geoData, setGeoData] = useState({ latitude: '', longitude: '' })
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  // Simplified coordinate transformation (for demonstration)
  // In a real application, you would use a proper coordinate transformation library
  const transformCoordinates = () => {
    setLoading(true)
    setTimeout(() => {
      if (transformType === 'utm-to-geo') {
        // Simplified UTM to Geographic conversion (this is just for demo)
        const { easting, northing, zone } = utmData
        if (!easting || !northing) {
          setResult('يرجى إدخال جميع البيانات المطلوبة')
          setLoading(false)
          return
        }
        
        // This is a very simplified conversion - in reality you'd use proj4js or similar
        const lat = (parseFloat(northing) / 111320).toFixed(6)
        const lon = (parseFloat(easting) / 111320).toFixed(6)
        
        setResult(`خط العرض: ${lat}°\nخط الطول: ${lon}°`)
      } else {
        // Geographic to UTM conversion
        const { latitude, longitude } = geoData
        if (!latitude || !longitude) {
          setResult('يرجى إدخال جميع البيانات المطلوبة')
          setLoading(false)
          return
        }
        
        // Simplified conversion
        const easting = (parseFloat(longitude) * 111320).toFixed(2)
        const northing = (parseFloat(latitude) * 111320).toFixed(2)
        
        setResult(`الإحداثي الشرقي: ${easting} متر\nالإحداثي الشمالي: ${northing} متر`)
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <Card className="calculator-card">
      <CardHeader>
        <CardTitle>تحويل الإحداثيات</CardTitle>
        <CardDescription>تحويل بين أنظمة الإحداثيات المختلفة</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>نوع التحويل</Label>
          <Select value={transformType} onValueChange={setTransformType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="utm-to-geo">UTM إلى جغرافي</SelectItem>
              <SelectItem value="geo-to-utm">جغرافي إلى UTM</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {transformType === 'utm-to-geo' ? (
          <div className="space-y-3">
            <div>
              <Label>المنطقة (Zone)</Label>
              <Select value={utmData.zone} onValueChange={(value) => setUtmData({...utmData, zone: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="35">35</SelectItem>
                  <SelectItem value="36">36</SelectItem>
                  <SelectItem value="37">37</SelectItem>
                  <SelectItem value="38">38</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>الإحداثي الشرقي (Easting)</Label>
              <Input
                placeholder="أدخل الإحداثي الشرقي"
                value={utmData.easting}
                onChange={(e) => setUtmData({...utmData, easting: e.target.value})}
                className="input-field"
              />
            </div>
            <div>
              <Label>الإحداثي الشمالي (Northing)</Label>
              <Input
                placeholder="أدخل الإحداثي الشمالي"
                value={utmData.northing}
                onChange={(e) => setUtmData({...utmData, northing: e.target.value})}
                className="input-field"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <Label>خط العرض (Latitude)</Label>
              <Input
                placeholder="أدخل خط العرض"
                value={geoData.latitude}
                onChange={(e) => setGeoData({...geoData, latitude: e.target.value})}
                className="input-field"
              />
            </div>
            <div>
              <Label>خط الطول (Longitude)</Label>
              <Input
                placeholder="أدخل خط الطول"
                value={geoData.longitude}
                onChange={(e) => setGeoData({...geoData, longitude: e.target.value})}
                className="input-field"
              />
            </div>
          </div>
        )}

        <Button onClick={transformCoordinates} disabled={loading} className="w-full">
          {loading ? 'جاري التحويل...' : 'تحويل الإحداثيات'}
        </Button>

        {result && (
          <div className="result-display">
            <pre className="whitespace-pre-line">{result}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default CoordinateTransform

