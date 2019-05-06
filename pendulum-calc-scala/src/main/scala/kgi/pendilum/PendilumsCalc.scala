package kgi.pendilum

import scala.scalajs.js
import scala.scalajs.js.annotation.{JSExport, JSExportTopLevel}
import scala.scalajs.js._

/**
  *
  */

trait PendilumsCalc {

  val g = 9.8


  def calculateK(secondsTillRepeat: Int, lengthOfFirst: Double): Double = {
    (secondsTillRepeat / Math.sqrt(lengthOfFirst / g)) / (2 * Math.PI) - 2
  }

  def calculateLengthOf(n: Int, secondsTillRepeat: Int, k: Double): Double = {
    g * Math.pow(secondsTillRepeat / (2 * Math.PI * (k + n + 1)), 2)
  }


  def calculateLengths(numPendilums: Int, secondsTillRepeat: Int, lengthOfFirst: Double): List[Double] = {
    val k: Double = calculateK(secondsTillRepeat, lengthOfFirst)
    List[Double](lengthOfFirst) ++ Range(2, numPendilums+1).map(n => calculateLengthOf(n, secondsTillRepeat, k))
  }

}

@JSExportTopLevel("PendilumsCalculator")
object PendilumsCalc extends PendilumsCalc with App {

  @JSExport
  def calculatePendilumsLengths(numPendilums: Int, secondsTillRepeat: Int, lengthOfFirst: Double): Array[Double] = {
    val res = new js.Array[Double]()
    res.++=(calculateLengths(numPendilums, secondsTillRepeat, lengthOfFirst).toArray)
    res
  }


  val sec = 24
  val len1 = 0.23
  val numP = 10
  val lengths = calculateLengths(numP, sec, len1).zipWithIndex
  println(s"for $sec repeat and $numP we got lengths: ${lengths.mkString("\n", "\n", "\n")} ")

}