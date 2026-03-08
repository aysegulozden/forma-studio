import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroCanvas() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const w = mount.clientWidth
    const h = mount.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100)
    camera.position.set(4, 3, 6)
    camera.lookAt(0, 0.5, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // Daha kalın ve parlak materyaller
    const mkMat = (color, opacity) => new THREE.LineBasicMaterial({ color, transparent: true, opacity })
    const mat       = mkMat(0xd4b896, 0.85)   // ana çizgiler — daha parlak
    const matAccent = mkMat(0xc86040, 0.95)   // vurgu (pencere, kapı, ışık)
    const matFaint  = mkMat(0xc4a882, 0.45)   // grid çizgileri

    const lines = new THREE.Group()
    scene.add(lines)

    const mkLine = (pts, m = mat) => {
      const g = new THREE.BufferGeometry().setFromPoints(
        pts.map(([x,y,z]) => new THREE.Vector3(x,y,z))
      )
      return new THREE.Line(g, m)
    }

    // Daha kalın görünüm için çift çizgi (slight offset)
    const mkThickLine = (pts, m = mat) => {
      const g = new THREE.Group()
      g.add(mkLine(pts, m))
      const offset = pts.map(([x,y,z]) => [x+0.012, y+0.012, z])
      g.add(mkLine(offset, m))
      return g
    }

    const pieces = []

    // ── Zemin ──
    const floor = new THREE.Group()
    floor.add(mkThickLine([[0,0,0],[4,0,0],[4,0,4],[0,0,4],[0,0,0]]))
    ;[[1,0,0],[2,0,0],[3,0,0]].forEach(([x]) => floor.add(mkLine([[x,0,0],[x,0,4]], matFaint)))
    ;[[1],[2],[3]].forEach(([z]) => floor.add(mkLine([[0,0,z],[4,0,z]], matFaint)))
    pieces.push({ group: floor, target: new THREE.Vector3(0,0,0), start: new THREE.Vector3(0,-5,0), delay: 0 })

    // ── Arka duvar ──
    const wallBack = new THREE.Group()
    wallBack.add(mkThickLine([[0,0,0],[0,3,0],[4,3,0],[4,0,0]]))
    ;[[1],[2],[3]].forEach(([x]) => wallBack.add(mkLine([[x,0,0],[x,3,0]], matFaint)))
    ;[[1],[2]].forEach(([y]) => wallBack.add(mkLine([[0,y,0],[4,y,0]], matFaint)))
    // pencere — vurgulu
    wallBack.add(mkThickLine([[1,1,0],[3,1,0],[3,2.5,0],[1,2.5,0],[1,1,0]], matAccent))
    wallBack.add(mkLine([[2,1,0],[2,2.5,0]], matAccent))
    wallBack.add(mkLine([[1,1.75,0],[3,1.75,0]], matAccent))
    // pencere çerçeve kalınlık
    wallBack.add(mkLine([[1,1,0],[3,1,0],[3,2.5,0],[1,2.5,0],[1,1,0]], matAccent))
    pieces.push({ group: wallBack, target: new THREE.Vector3(0,0,0), start: new THREE.Vector3(0,0,-6), delay: 0.3 })

    // ── Sol duvar ──
    const wallLeft = new THREE.Group()
    wallLeft.add(mkThickLine([[0,0,0],[0,3,0],[0,3,4],[0,0,4]]))
    ;[[1],[2],[3]].forEach(([z]) => wallLeft.add(mkLine([[0,0,z],[0,3,z]], matFaint)))
    ;[[1],[2]].forEach(([y]) => wallLeft.add(mkLine([[0,y,0],[0,y,4]], matFaint)))
    // kapı — vurgulu
    wallLeft.add(mkThickLine([[0,0,1.5],[0,0,2.5],[0,2.2,2.5],[0,2.2,1.5],[0,0,1.5]], matAccent))
    wallLeft.add(mkLine([[0,1.1,2.3],[0,1.1,2.3]], matAccent)) // kapı kolu
    pieces.push({ group: wallLeft, target: new THREE.Vector3(0,0,0), start: new THREE.Vector3(-6,0,0), delay: 0.5 })

    // ── Tavan ──
    const ceiling = new THREE.Group()
    ceiling.add(mkThickLine([[0,3,0],[4,3,0],[4,3,4],[0,3,4],[0,3,0]]))
    ;[[1],[2],[3]].forEach(([x]) => ceiling.add(mkLine([[x,3,0],[x,3,4]], matFaint)))
    ;[[1],[2],[3]].forEach(([z]) => ceiling.add(mkLine([[0,3,z],[4,3,z]], matFaint)))
    // sarkıt lamba — vurgulu
    ceiling.add(mkThickLine([[2,3,2],[2,2.1,2]], matAccent))
    ceiling.add(mkThickLine([[1.75,2.1,1.75],[2.25,2.1,1.75],[2.25,2.1,2.25],[1.75,2.1,2.25],[1.75,2.1,1.75]], matAccent))
    // ışık halkası
    ceiling.add(mkLine([[1.75,2.1,1.75],[2.25,2.1,1.75],[2.25,2.1,2.25],[1.75,2.1,2.25],[1.75,2.1,1.75]], matAccent))
    pieces.push({ group: ceiling, target: new THREE.Vector3(0,0,0), start: new THREE.Vector3(0,6,0), delay: 0.7 })

    // ── Koltuk ──
    const sofa = new THREE.Group()
    // oturak
    sofa.add(mkThickLine([[0.5,0.5,2.4],[2.1,0.5,2.4],[2.1,0.5,3.6],[0.5,0.5,3.6],[0.5,0.5,2.4]]))
    sofa.add(mkLine([[0.5,0.9,2.4],[2.1,0.9,2.4],[2.1,0.9,3.6],[0.5,0.9,3.6],[0.5,0.9,2.4]], mat))
    ;[[0.5,0.5,2.4],[2.1,0.5,2.4],[0.5,0.5,3.6],[2.1,0.5,3.6]].forEach(([x,y,z]) =>
      sofa.add(mkLine([[x,y,z],[x,0.9,z]], mat)))
    // sırtlık
    sofa.add(mkThickLine([[0.5,0.9,3.6],[0.5,1.7,3.6],[2.1,1.7,3.6],[2.1,0.9,3.6]], matAccent))
    sofa.add(mkLine([[0.5,0.9,3.6],[0.5,1.7,3.6]], matAccent))
    sofa.add(mkLine([[2.1,0.9,3.6],[2.1,1.7,3.6]], matAccent))
    // kolçaklar
    sofa.add(mkLine([[0.5,0.9,2.4],[0.5,1.15,2.4],[0.5,1.15,3.6]], mat))
    sofa.add(mkLine([[2.1,0.9,2.4],[2.1,1.15,2.4],[2.1,1.15,3.6]], mat))
    pieces.push({ group: sofa, target: new THREE.Vector3(0,0,0), start: new THREE.Vector3(-4,-3,3), delay: 1.0 })

    // ── Sehpa ──
    const table = new THREE.Group()
    table.add(mkThickLine([[1,0.65,1.2],[2.5,0.65,1.2],[2.5,0.65,2.1],[1,0.65,2.1],[1,0.65,1.2]]))
    ;[[1.1,1.3],[1.1,1.9],[2.4,1.3],[2.4,1.9]].forEach(([x,z]) =>
      table.add(mkLine([[x,0.4,z],[x,0.65,z]], mat)))
    // üstünde nesne (vazo)
    table.add(mkLine([[1.7,0.65,1.55],[1.7,1.05,1.55]], matAccent))
    table.add(mkLine([[1.6,0.65,1.55],[1.8,0.65,1.55]], matAccent))
    pieces.push({ group: table, target: new THREE.Vector3(0,0,0), start: new THREE.Vector3(4,-4,0), delay: 1.2 })

    // ── Raf sistemi ──
    const shelf = new THREE.Group()
    shelf.add(mkThickLine([[0.08,1.4,0.08],[0.08,2.9,0.08]]))
    shelf.add(mkThickLine([[1.3,1.4,0.08],[1.3,2.9,0.08]]))
    ;[[1.4],[1.85],[2.3],[2.75]].forEach(([y]) =>
      shelf.add(mkThickLine([[0.08,y,0.08],[1.3,y,0.08]])))
    // kitaplar
    ;[[0.2,1.4,0.08,1.8],[0.4,1.4,0.08,2.0],[0.6,1.4,0.08,1.75],[0.8,1.4,0.08,1.9]].forEach(([x,y,z,top]) => {
      shelf.add(mkLine([[x,y,z],[x,top,z],[x+0.15,top,z],[x+0.15,y,z]], matAccent))
    })
    pieces.push({ group: shelf, target: new THREE.Vector3(0,0,0), start: new THREE.Vector3(5,5,-3), delay: 1.4 })

    // ── Halı ──
    const rug = new THREE.Group()
    rug.add(mkThickLine([[0.6,0.01,1.1],[2.8,0.01,1.1],[2.8,0.01,3.5],[0.6,0.01,3.5],[0.6,0.01,1.1]], matAccent))
    rug.add(mkLine([[0.8,0.01,1.3],[2.6,0.01,1.3],[2.6,0.01,3.3],[0.8,0.01,3.3],[0.8,0.01,1.3]], matFaint))
    pieces.push({ group: rug, target: new THREE.Vector3(0,0,0), start: new THREE.Vector3(0,-3,0), delay: 1.6 })

    pieces.forEach(p => { p.group.position.copy(p.start); lines.add(p.group) })

    // ── Ambient partiküller ──
    const pGeo = new THREE.BufferGeometry()
    const pArr = new Float32Array(80 * 3)
    for (let i = 0; i < 80; i++) {
      pArr[i*3]   = (Math.random()-0.5)*12
      pArr[i*3+1] = (Math.random()-0.5)*9
      pArr[i*3+2] = (Math.random()-0.5)*12
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pArr, 3))
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xd4b896, size: 0.05, transparent: true, opacity: 0.5 }))
    scene.add(particles)

    // ── Mouse ──
    const mouse = { x: 0, y: 0 }
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5)
      mouse.y = (e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Animate ──
    const t0 = Date.now()
    let rafId
    const ease = (t) => 1 - Math.pow(1-t, 3)

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const elapsed = (Date.now() - t0) * 0.001

      pieces.forEach(p => {
        const t = Math.max(0, Math.min(1, (elapsed - p.delay) / 2.0))
        const e = ease(t)
        p.group.position.lerpVectors(p.start, p.target, e)
        // opacity da artır
        p.group.traverse(child => {
          if (child.material) {
            const base = child.material.color?.getHex() === 0xc86040 ? 0.95
                       : child.material.color?.getHex() === 0xc4a882 ? 0.45 : 0.85
            child.material.opacity = base * e
          }
        })
      })

      lines.rotation.y = elapsed * 0.055 + mouse.x * 0.22
      lines.rotation.x = -0.12 + mouse.y * 0.1
      lines.position.set(-2, -1.5, 0)
      particles.rotation.y = elapsed * 0.018

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const w2 = mount.clientWidth, h2 = mount.clientHeight
      camera.aspect = w2/h2; camera.updateProjectionMatrix()
      renderer.setSize(w2, h2)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none' }} />
}
